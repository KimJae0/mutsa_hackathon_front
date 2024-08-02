import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DayDetailModal from './DayModal';
import 'react-calendar/dist/Calendar.css';
import './CalendarPanel.css';

function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dayDetails, setDayDetails] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // 여기에 실제 데이터를 가져오는 로직을 추가할 수 있습니다.
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
    <div className="main-panel">
      <Calendar onClickDay={handleDateClick} />
      <DayDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedDate={selectedDate}
        dayDetails={dayDetails}
      />
    </div>
  );
}

export default CalendarPanel;
