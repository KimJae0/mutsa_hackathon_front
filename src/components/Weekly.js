import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

function Weekly({ week, records }) {
  const getDailyTotal = (date) => {
    return records.reduce((total, record) => {
      const recordDateStr = moment(record.date).format('YYYY-MM-DD');
      const dateStr = moment(date).format('YYYY-MM-DD');
      if (recordDateStr === dateStr) {
        const moneyList = record.moneyList || [];
        moneyList.forEach(item => {
          if (item.money && item.money.cost) {
            total += parseInt(item.money.cost, 10) || 0;
          }
        });
      }
      return total;
    }, 0);
  };

  const dailyTotals = week.map(day => getDailyTotal(day));

  const data = {
    labels: week.map(day => moment(day).format('MM-DD (ddd)')),
    datasets: [
      {
        label: '소비 금액',
        data: dailyTotals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>{`주간 소비 통계 (${moment(week[0]).format('YYYY-MM-DD')} ~ ${moment(week[6]).format('YYYY-MM-DD')})`}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Weekly;
