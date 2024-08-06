import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { firestore, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Monthly({ selMonth }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const recordsCollectionRef = collection(firestore, 'records');
        const q = query(recordsCollectionRef, where('uid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const recordsData = querySnapshot.docs.map(doc => doc.data());
        
        const monthlyData = recordsData.filter(record => {
          const recordDate = record.date.toDate();
          return recordDate.getFullYear() === selMonth[0] && recordDate.getMonth() + 1 === selMonth[1];
        });

        const categories = {
          foodExpense: 0,
          transportationFee: 0,
          clothesExpense: 0,
          leisureExpense: 0,
          etcExpense: 0,
        };

        monthlyData.forEach(record => {
          record.moneyList.forEach(money => {
            if (money.option in categories) {
              categories[money.option] += Number(money.cost);
            }
          });
        });

        setChartData({
          labels: ['식비', '교통비', '의류', '여가', '기타'],
          datasets: [
            {
              label: '월간 소비',
              data: [
                categories.foodExpense,
                categories.transportationFee,
                categories.clothesExpense,
                categories.leisureExpense,
                categories.etcExpense,
              ],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        });
      }
    };

    fetchData();
  }, [selMonth]);

  return (
    <div>
      <h2>{selMonth[0]}년 {selMonth[1]}월 소비 통계</h2>
      {chartData && <Doughnut data={chartData} />}
    </div>
  );
}

export default Monthly;
