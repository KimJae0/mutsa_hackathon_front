import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DayModal from './DayModal';
import 'react-calendar/dist/Calendar.css';
import './CalendarPanel.css';

function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dayDetails, setDayDetails] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDayDetails({
      consumption: [
        "오전 11시 20분 아이스아메리카노",
        "오후 1시 20분 샐러드",
        "오후 5시 다이스"
      ],
      waste: [
        "플라스틱 컵 1개 (오전 11시 20분 아이스아메리카노)",
        "쓰레기배출량",
        "쓰레기배출량",
        "쓰레기배출량",
        "쓰레기배출량"
      ],
      foodRecords: [
        "먹은 거 기록1",
        "먹은 거 기록2",
        "먹은 거 기록3",
        "먹은 거 기록4"
      ]
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100">
      <Calendar
        onClickDay={handleDateClick}
        locale="en-US" // 요일을 영어로 설정
        className="w-full"
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            return 'text-center h-24 p-2';
          }
        }}
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
