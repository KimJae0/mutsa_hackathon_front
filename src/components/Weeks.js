import React, { useState, useEffect } from 'react';
import { firestore } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';
import Weekly from './Weekly';
import moment from 'moment';
import 'chart.js/auto'; // chart.js/auto를 import합니다.

function Weeks({ selMonth }) {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    if (auth.currentUser) {
      const recordsCollectionRef = collection(firestore, 'records');
      const q = query(
        recordsCollectionRef,
        where('uid', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const recordsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(), // Timestamp를 Date 객체로 변환
      }));
      setRecords(recordsData);
    }
  };

  useEffect(() => {
    fetchRecords();
    setWeeks(getWeeksInMonth(selMonth));
  }, [selMonth]);

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

  return (
    <div>
      <div>
        {weeks.map((week, index) => (
          <button
            key={index}
            onClick={() => setSelectedWeek(week)}
            className={`px-4 py-2 rounded ml-3 mb-5 ${
              selectedWeek === 'week'
                ? 'bg-blue-500 text-white text-xl'
                : 'bg-gray-200 text-black'
            }`}
          >
            {`Week ${index + 1}`}
          </button>
        ))}
      </div>
      {selectedWeek && <Weekly week={selectedWeek} records={records} />}
    </div>
  );
}

export default Weeks;
