import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Weeks from '../components/Weeks';
import Monthly from '../components/Monthly';
import { firestore } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function NutritionStatsPage() {
  const currentDate = new Date();
  const currentYearMonth = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ];
  const [selected, setSelected] = useState('week');
  const [selMonth, setSelMonth] = useState(currentYearMonth);
  const [nutritionData, setNutritionData] = useState([]);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const year = selMonth[0];
      const month = selMonth[1];
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const recordsRef = collection(firestore, 'records');
      const q = query(recordsRef, where('date', '>=', startDate), where('date', '<=', endDate));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => {
        const record = doc.data();
        record.date = record.date.toDate(); // Firestore Timestamp를 Date 객체로 변환
        return record;
      });

      setNutritionData(data);
    };

    fetchNutritionData();
  }, [selMonth]);

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
      <h1>주간 영양소 통계</h1>
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
        <Weeks selMonth={selMonth} data={nutritionData} />
      ) : (
        <Monthly selMonth={selMonth} data={nutritionData} />
      )}
    </div>
  );
}

export default NutritionStatsPage;
