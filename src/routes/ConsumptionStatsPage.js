import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Weeks from '../components/Weeks';
import Monthly from '../components/Monthly';
import Footer from '../components/Footer';
import { firestore, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';

function ConsumptionStatsPage() {
  const currentDate = new Date();
  const currentYearMonth = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ];
  const [selected, setSelected] = useState('week');
  const [selMonth, setSelMonth] = useState(currentYearMonth);
  const [monthlyData, setMonthlyData] = useState({});

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
    const fetchMonthlyData = async () => {
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

        const consumptionData = {
          foodExpense: 0,
          transportationFee: 0,
          clothesExpense: 0,
          leisureExpense: 0,
          etcExpense: 0,
        };

        filteredData.forEach(record => {
          record.moneyList.forEach(item => {
            if (item.money.option in consumptionData) {
              consumptionData[item.money.option] += parseInt(item.money.cost);
            }
          });
        });

        setMonthlyData(consumptionData);
      }
    };

    fetchMonthlyData();
  }, [selMonth]);

  const monthOption = generateMonthOptions();

  const chartData = {
    labels: ['식비', '교통비', '의류', '여가', '기타'],
    datasets: [
      {
        data: [
          monthlyData.foodExpense,
          monthlyData.transportationFee,
          monthlyData.clothesExpense,
          monthlyData.leisureExpense,
          monthlyData.etcExpense,
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <div>
      <Header />
      <ButtonGroup aria-label="WeekorMonth">
        <Button variant="secondary" onClick={() => setSelected('week')}>
          주간 통계
        </Button>
        <Button variant="secondary" onClick={() => setSelected('month')}>
          월간 통계
        </Button>
      </ButtonGroup>
      <select onChange={onMonthChange}>
        {monthOption.map(({ month, year }, index) => (
          <option key={index} value={`${year}-${month}`}>
            {year}.{month}
          </option>
        ))}
      </select>
      <h1>
        {selMonth[0]}년 {selMonth[1]}월 소비 통계
      </h1>
      {selected === 'week' ? (
        <Weeks selMonth={selMonth} />
      ) : (
        <div style={{ width: '50%', height: '50%', margin: 'auto' }}>
          <Pie data={chartData} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ConsumptionStatsPage;
