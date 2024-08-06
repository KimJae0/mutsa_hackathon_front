import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/CalendarComponent';
import InputBox from '../components/InputBox';
import Dropdown from '../components/Dropdown';
import { Button } from '../components/ButtonGroup';
import NewMoney from '../components/NewMoney';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Edit() {
  const [moneyList, setMoneyList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('데이터 저장');
    navigate('/home');
  };

  const addNewMoney = () => {
    console.log('Adding new money');
    setMoneyList([...moneyList, moneyList.length + 1]);
  };

  return (
    <div>
      <Header />
      <h1>기록 추가하기</h1>
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
        <button type="button" onClick={() => console.log('삭제')}>
          삭제하기
        </button>
        <input type="submit" value="저장"></input>
      </form>
      <Footer />
    </div>
  );
}

export default Edit;
