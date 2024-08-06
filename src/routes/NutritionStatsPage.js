import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { firestore, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

function NutritionStatsPage() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [monthlyData, setMonthlyData] = useState({});

  const onMonthChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setSelectedYear(year);
    setSelectedMonth(month);
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

        const categoryTotals = {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        };

        recordsData.forEach(record => {
          const monthName = moment(record.date).format('MMMM');
          if (record.moneyList) {
            record.moneyList.forEach(item => {
              if (item.food && item.food.enerc) {
                categoryTotals[monthName] += parseFloat(item.food.enerc || 0);
              }
            });
          }
        });

        setMonthlyData(categoryTotals);
      }
    };

    fetchMonthlyData();
  }, [selectedMonth, selectedYear]);

  const monthOption = generateMonthOptions();

  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Energy (kcal)',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Header />
      <h1>2024년 월간 통계</h1>
      <div style={{ width: '80%', height: '80%', margin: 'auto' }}>
        <Bar data={monthlyChartData} />
      </div>
      <Footer />
    </div>
  );
}

export default NutritionStatsPage;
