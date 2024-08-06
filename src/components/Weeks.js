import React, { useState, useEffect } from 'react';
import Weekly from './Weekly';

function Weeks({ selMonth, data }) {
  const [weeks, setWeeks] = useState([]);
  const [week, setWeek] = useState(null);

  const getWeeksInMonth = (yearMonth) => {
    const [year, month] = yearMonth;
    const weeks = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    let start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay());
    while (start <= lastDay) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (start.getMonth() === month - 1) {
          week.push(new Date(start));
        }
        start.setDate(start.getDate() + 1);
      }
      if (week.length) {
        weeks.push(week);
      }
    }
    return weeks;
  };

  useEffect(() => {
    setWeeks(getWeeksInMonth(selMonth));
  }, [selMonth]);

  return (
    <div>
      {weeks.map((week, index) => (
        <button key={index} onClick={() => setWeek(week)}>
          <h3>Week {index + 1}</h3>
        </button>
      ))}
      {week && <Weekly selMonth={selMonth} week={week} data={data} />}
    </div>
  );
}

export default Weeks;
