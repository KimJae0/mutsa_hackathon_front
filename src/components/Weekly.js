import React, { useState, useEffect } from 'react';

function Weekly({ selMonth, week }) {
  const [year, month] = selMonth;
  return (
    <div>
      {week.map((day, index) => (
        <p key={index}>
          {year}.{month}.{day.getDate()}
        </p>
      ))}
    </div>
  );
}

export default Weekly;
