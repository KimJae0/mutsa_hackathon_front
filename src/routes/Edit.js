import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarComponent from '../components/CalendarComponent';
import InputBox from '../components/InputBox';
import Dropdown from '../components/Dropdown';
import { Button } from '../components/ButtonGroup';
import NewMoney from '../components/NewMoney';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { firestore } from '../config/firebase';
import { getDocs, collection, deleteDoc, updateDoc, query, where, doc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import moment from 'moment';
import { Firestore } from 'firebase/firestore';

function Edit() {
  const [moneyList, setMoneyList] = useState([]);
  const [records, setRecords] = useState([]);
  const [totalCosts, setTotalCosts] = useState({});
  const navigate = useNavigate();

  const recordsCollectionRef = collection(firestore, 'records');

  const location = useLocation();
  const { state } = location;
  const [editDate, setEditDate] = useState(
    location.state?.editdDate
  )

  const fetchRecords = async () => {
    if (auth.currentUser) {
      const recordsCollectionRef = collection(firestore, 'records');
      const q = query(
        recordsCollectionRef, 
        where('uid', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const recordsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate() // Timestamp를 Date 객체로 변환
      }));

      console.log("Fetched Records:", recordsData); // 디버깅용 콘솔 로그

      const selectedDateStr = moment(location.state.editDate).format('YYYY-MM-DD');

      const selectedRecords = records.filter(record => {
      const recordDateStr = moment(record.date).format('YYYY-MM-DD');
      return recordDateStr === selectedDateStr;
    });

      setRecords(recordsData);
      console.log("records:", recordsData);

    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditDate(location.state.editDate);

    await updateDoc(recordsCollectionRef, {
      uid: auth.currentUser.uid,
      date: location.state.editDate,
      moneyList: records,
    });

    navigate('/home');
  };

  const onDelete = async () => {
    const recordId = records.id;
    await deleteDoc(doc(firestore, "records", records[0].id));

    navigate('/');
  }

  const addNewMoney = () => {
    console.log('Adding new money');
    setMoneyList([...moneyList, moneyList.length + 1]);
    console.log(location.state.editDate);
  };

  return (
    <div>
      <Header />
      <h1>기록 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <NewMoney />
        {moneyList.map((index) => (
          <NewMoney key={index} index={index} />
        ))}
        <button type="button" onClick={() => addNewMoney()}>
          새로운 소비 추가
        </button>
        <Button type="button" variant="link" onClick={() => navigate('/home')}>
          취소
        </Button>
        <button type="button" onClick={onDelete}>
          삭제하기
        </button>
        <input type="submit" value="저장"></input>
      </form>
      <Footer />
    </div>
  );
}

export default Edit;
