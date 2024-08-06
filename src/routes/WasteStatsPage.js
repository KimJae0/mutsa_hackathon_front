import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { firestore, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function WasteStatsPage() {
  const currentDate = new Date();
  const currentYearMonth = [currentDate.getFullYear(), currentDate.getMonth() + 1];
  const [selected, setSelected] = useState('week');
  const [selMonth, setSelMonth] = useState(currentYearMonth);
  const [weeklyData, setWeeklyData] = useState([]);

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

  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (auth.currentUser) {
        const recordsCollectionRef = collection(firestore, 'records');
        const q = query(recordsCollectionRef, where('uid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const recordsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        }));

        const filteredData = recordsData.filter(record => {
          const recordMonth = record.date.getMonth() + 1;
          const recordYear = record.date.getFullYear();
          return recordMonth === selMonth[1] && recordYear === selMonth[0];
        });

        const dailyTotals = {};
        filteredData.forEach(record => {
          const dateStr = moment(record.date).format('YYYY-MM-DD');
          if (!dailyTotals[dateStr]) {
            dailyTotals[dateStr] = 0;
          }
          if (record.moneyList) {
            record.moneyList.forEach(item => {
              if (item.trash && item.trash.trWeight) {  // weight가 trWeight로 수정됨
                dailyTotals[dateStr] += parseInt(item.trash.trWeight, 10);
              }
            });
          }
        });

        const weeklyTotals = [0, 0, 0, 0, 0];
        Object.keys(dailyTotals).forEach(dateStr => {
          const weekNumber = Math.ceil(moment(dateStr).date() / 7);
          weeklyTotals[weekNumber - 1] += dailyTotals[dateStr];
        });

        setWeeklyData(weeklyTotals);
      }
    };

    fetchWeeklyData();
  }, [selMonth]);

  const monthOption = generateMonthOptions();

  const weeklyChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Trash Weight (g)',
        data: weeklyData,
        backgroundColor: '#36A2EB'
      }
    ]
  };

  return (
    <div>
      <Header />
      <div>
        <ButtonGroup aria-label="WeekorMonth">
          <Button variant="secondary" onClick={() => setSelected('week')}>
            주간 통계
          </Button>
        </ButtonGroup>
      </div>
      <select onChange={onMonthChange}>
        {monthOption.map(({ month, year }, index) => (
          <option key={index} value={`${year}-${month}`}>
            {year}.{month}
          </option>
        ))}
      </select>
      <h1>
        {selMonth[0]}년 {selMonth[1]}월 주간 통계
      </h1>
      <div style={{ width: '70%', height: '70%', margin: 'auto' }}>
        <Bar data={weeklyChartData} />
      </div>
      <Footer />
    </div>
  );
}

export default WasteStatsPage;
