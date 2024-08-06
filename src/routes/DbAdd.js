import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import './DbAdd.css';
import Footer from '../components/Footer';

function DbAdd() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [selectedTab, setSelectedTab] = useState('영양소');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 데이터를 서버로 전송하는 로직을 여기에 추가할 수 있습니다.
    console.log({ name, calories, carbs, protein, fat });
  };

  return (
    <div className="db-add-container">
      <div className="left-buttons">
        <ButtonGroup vertical className="button-group">
          <Button
            variant={selectedTab === '영양소' ? 'primary' : 'secondary'}
            onClick={() => setSelectedTab('영양소')}
          >
            영양소
          </Button>
          <Button
            variant={selectedTab === '쓰레기' ? 'primary' : 'secondary'}
            onClick={() => setSelectedTab('쓰레기')}
          >
            쓰레기
          </Button>
        </ButtonGroup>
      </div>
      <div className="form-container">
        <h2>새로운 음식 정보 등록하기</h2>
        <form onSubmit={handleSubmit}>
          <label>
            이름:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            칼로리:
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </label>
          <label>
            탄수화물:
            <input
              type="text"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </label>
          <label>
            단백질:
            <input
              type="text"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </label>
          <label>
            지방:
            <input
              type="text"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </label>
          <button type="submit">등록하기</button>
        </form>
      </div>
    </div>
  );
}

export default DbAdd;
