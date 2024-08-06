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
  const [totalCosts, setTotalCosts] = useState({});

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
      console.log("Fetched Records:", recordsData); // 디버깅용 콘솔 로그

      const costs = {};
      recordsData.forEach(record => {
        const dateStr = moment(record.date).format('YYYY-MM-DD');
        const moneyList = record.moneyList || [];
        let totalCost = 0;
        moneyList.forEach(item => {
          if (item.money && item.money.cost) {
            totalCost += parseInt(item.money.cost, 10) || 0; // 문자열을 정수로 변환하여 덧셈
          }
        });
        if (totalCost > 0) {
          costs[dateStr] = (costs[dateStr] || 0) + totalCost;
        }
      });

      setRecords(recordsData);
      setTotalCosts(costs);
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

    console.log("Selected Date:", selectedDateStr); // 디버깅용 콘솔 로그
    console.log("Selected Records:", selectedRecords); // 디버깅용 콘솔 로그

    if (selectedRecords.length > 0) {
      const { moneyList = [] } = selectedRecords[0];
      console.log("Money List:", moneyList); // 디버깅용 콘솔 로그

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

      console.log("Filtered Consumption:", consumption); // 디버깅용 콘솔 로그
      console.log("Filtered Food Records:", foodRecords); // 디버깅용 콘솔 로그
      console.log("Filtered Waste:", waste); // 디버깅용 콘솔 로그

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
      const totalCost = totalCosts[dateStr];

      if (totalCost) {
        return (
          <div className="cost-indicator">
            {totalCost} 원
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
