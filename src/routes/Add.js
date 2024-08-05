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

export const RecordContext = createContext();

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

  const recordsCollectionRef = collection(firestore, 'records');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addDoc(recordsCollectionRef, {
      uid: auth.currentuser.uid,
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

  const showDate = moment(selDate).format('YYYY-MM-DD');

  return (
    <div>
      <Header />
      <h1>기록 추가하기</h1>
      <RecordContext.Provider value={records}>
        <form onSubmit={handleSubmit}>
          <CalendarContainer>
            <Calendar
              onChange={onDateChange}
              name="date"
              value={selDate}
            ></Calendar>
            <h3>{showDate}</h3>
          </CalendarContainer>
          <NewMoney />
          {moneyList.map((index) => (
            <NewMoney key={index} index={index} />
          ))}
          <button
            className="sc-fFubCH sc-hvaAl cpCAks cdXuZh"
            type="button"
            onClick={() => addNewMoney()}
          >
            새로운 소비 추가
          </button>
          <Button type="button" variant="link" onClick={() => navigate('/')}>
            취소
          </Button>
          <input type="submit" value="저장"></input>
        </form>
      </RecordContext.Provider>
    </div>
  );
}

export default Add;
