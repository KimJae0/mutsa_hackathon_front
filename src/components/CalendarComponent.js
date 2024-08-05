import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import moment from 'moment';
import styled from 'styled-components';


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

function CalendarComponent() {
  const [selDate, setSelDate] = useState(new Date());

  const onDateChange = (date) => {
    setSelDate(date);
  };

  const showDate = moment(selDate).format('YYYY-MM-DD');

  return (
    <CalendarContainer>
      <Calendar onChange={onDateChange} name="date" value={selDate}></Calendar>
      <h3>{showDate}</h3>
    </CalendarContainer>
  );
}

export default CalendarComponent;
