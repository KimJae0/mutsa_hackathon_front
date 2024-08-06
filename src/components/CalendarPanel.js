import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import DayModal from './DayModal';
import 'react-calendar/dist/Calendar.css';
import './CalendarPanel.css';
import { firestore } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';
import moment from 'moment';

function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dayDetails, setDayDetails] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    if (auth.currentUser) {
      const recordsCollectionRef = collection(firestore, 'records');
      const q = query(recordsCollectionRef, where('uid', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const recordsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate() // Timestamp를 Date 객체로 변환
      }));
      setRecords(recordsData);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const selectedDateStr = moment(date).format('YYYY-MM-DD');
    const selectedRecords = records.filter(record => {
      const recordDateStr = moment(record.date).format('YYYY-MM-DD');
      return recordDateStr === selectedDateStr;
    });

    if (selectedRecords.length > 0) {
      const { moneyList = [] } = selectedRecords[0];
      const consumption = [];
      const foodRecords = [];
      const waste = [];

      moneyList.forEach(item => {
        if (item.hasOwnProperty('money')) {
          consumption.push(item.money);
        }
        if (item.hasOwnProperty('food')) {
          foodRecords.push(item.food);
        }
        if (item.hasOwnProperty('trash')) {
          waste.push(item.trash);
        }
      });

      setDayDetails({
        consumption: consumption,
        foodRecords: foodRecords,
        waste: waste
      });
    } else {
      setDayDetails({
        consumption: [],
        waste: [],
        foodRecords: []
      });
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const dayRecords = records.filter(record => {
        const recordDateStr = moment(record.date).format('YYYY-MM-DD');
        return recordDateStr === dateStr;
      });

      if (dayRecords.length > 0) {
        let totalCost = 0;
        let totalWeight = 0;
        let totalEnergy = 0;

        dayRecords.forEach(record => {
          record.moneyList.forEach(item => {
            if (item.money && item.money.cost) {
              totalCost += parseInt(item.money.cost, 10);
            }
            if (item.trash && item.trash.trWeight) {
              totalWeight += parseInt(item.trash.trWeight, 10);
            }
            if (item.food && item.food.enerc) {
              totalEnergy += parseInt(item.food.enerc, 10);
            }
          });
        });

        return (
          <div>
            <div>{totalCost.toLocaleString()} 원</div>
            <div>쓰레기: {totalWeight} g</div>
            <div>에너지: {totalEnergy} kcal</div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="main-panel">
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
      />
      <DayModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedDate={selectedDate}
        dayDetails={dayDetails}
      />
    </div>
  );
}

export default CalendarPanel;
