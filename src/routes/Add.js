import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/CalendarComponent';
import InputBox from '../components/InputBox';
import Dropdown from '../components/Dropdown';
import { Button } from '../components/ButtonGroup';
import NewMoney from '../components/NewMoney';
import Header from '../components/Header';
import { firestore } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import Calendar from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import Footer from '../components/Footer';
import '../components/CalendarComponent.css';

export const RecordsContext = createContext();

const CalendarContainer = styled.div`
  .react-calendar {
    border: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  .react-calendar__tile {
    height: 50px;
  }

  .react-calendar__tile--active {
    background: #1e90ff;
    color: white;
  }
`;

function Add() {
  const [moneyList, setMoneyList] = useState([]);
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [selDate, setSelDate] = useState(new Date());

  const [user, setUser] = useState(null);

  const recordsCollectionRef = collection(firestore, 'records');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addDoc(recordsCollectionRef, {
      uid: auth.currentUser.uid,
      date: selDate,
      moneyList: records,
    });

    navigate('/home');
  };

  const addNewMoney = () => {
    console.log('Adding new money');
    setMoneyList([...moneyList, moneyList.length + 1]);
    //console.log(foodOutput);
  };

  const onDateChange = (date) => {
    setSelDate(date);
  };

  const showDate = moment(selDate).format('YYYY년 MM월 DD일');

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const hasRecord = records.some((record) => {
        const recordDateStr = moment(record.date).format('YYYY-MM-DD');
        return recordDateStr === dateStr;
      });
    }
    return null;
  };

  return (
    <div>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-lg mb-5">기록 추가하기</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col items-center"
        >
          <CalendarContainer>
            <Calendar
              onChange={onDateChange}
              name="date"
              value={selDate}
              tileContent={tileContent}
              className="custom-calendar"
            ></Calendar>
            <h3 className="text-2xl my-8 text-center">{showDate}</h3>
          </CalendarContainer>
          <RecordsContext.Provider value={records}>
            <NewMoney />
            {moneyList.map((index) => (
              <NewMoney key={index} index={index} />
            ))}
            <button
              className="bg-slate-100 rounded border-solid border-black py-3 w-80 my-6"
              type="button"
              onClick={() => addNewMoney()}
            >
              새로운 소비 추가
            </button>
            <div className="flex justify-center space-x-5 items-center mt-3 ml-1.5">
              <button
                type="button"
                variant="link"
                onClick={() => navigate('/home')}
                className="bg-slate-300 text-white rounded-full py-3 w-40"
              >
                취소
              </button>
              <button
                className="bg-black text-white rounded-full py-3 w-40 mt-0"
                type="submit"
              >
                저장
              </button>
            </div>
          </RecordsContext.Provider>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Add;
