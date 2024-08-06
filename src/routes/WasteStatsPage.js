import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Weeks from '../components/Weeks';
import Monthly from '../components/Monthly';
import Footer from '../components/Footer';

function WasteStatsPage() {
  const currentDate = new Date();
  const currentYearMonth = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ];
  const [selected, setSelected] = useState('week');
  const [selMonth, setSelMonth] = useState(currentYearMonth);

  const onMonthChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setSelMonth([year, month]);
  };

  const generateMonthOptions = (monthsCount = 36) => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < monthsCount; i++) {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      options.push({ month, year });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return options;
  };

  const monthOption = generateMonthOptions();
  return (
    <div>
      <Header />
      <h1>주간 쓰레기 통계</h1>
      <select onChange={onMonthChange}>
        {monthOption.map(({ month, year }, index) => (
          <option key={index} value={`${year}-${month}`}>
            {year}.{month}
          </option>
        ))}
      </select>
      <h1>
        {selMonth[0]}년 {selMonth[1]}월
      </h1>
      {selected === 'week' ? (
        <Weeks selMonth={selMonth} />
      ) : (
        <Monthly month={selMonth} />
      )}
      <Footer />
    </div>
  );
}

export default WasteStatsPage;