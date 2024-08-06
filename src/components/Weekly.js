import React from 'react';

function Weekly({ selMonth, week, data }) {
  const [year, month] = selMonth;

  const getDailyNutrition = (day) => {
    return data.filter(record => {
      const recordDate = record.date.toDate();
      return recordDate.getFullYear() === day.getFullYear() &&
             recordDate.getMonth() === day.getMonth() &&
             recordDate.getDate() === day.getDate();
    });
  };

  return (
    <div>
      {week.map((day, index) => (
        <div key={index}>
          <p>
            {year}.{month}.{day.getDate()}
          </p>
          <ul>
            {getDailyNutrition(day).map((record, i) => (
              <li key={i}>
                {record.food && record.food.brand ? `${record.food.brand} - ${record.food.enerc} kcal` : 'No food data'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Weekly;
