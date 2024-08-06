import React, { useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';
import ModalForm from '../components/ModalForm';
import './DbSearch.css';
import { firestore } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import Footer from '../components/Footer';

function DbSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('영양소');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //db 검색
  const handleSearch = async () => {
    try {
      if (selectedTab === '영양소') {
        // 음식 검색

        const results = [];
        const querySnapshot = await getDocs(collection(firestore, 'food'));
        querySnapshot.forEach((doc) => {
          const result = (doc.id, ' => ', doc.data());
          const title = (result.brand + result.foodNm).replace(/\s/g, '');
          //console.log(title);

          if (title.includes(searchTerm.replace(/\s/g, ''))) {
            results.push(result);
            //console.log(result);
          }
        });
        setSearchResults(results);
      } else {
        // 쓰레기 검색

        const results = [];
        const querySnapshot = await getDocs(collection(firestore, 'trash'));
        querySnapshot.forEach((doc) => {
          const result = (doc.id, ' => ', doc.data());
          if (result.trName.includes(searchTerm)) results.push(result);
        });
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleShowModal = () => {
    setError('');
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  //db 추가 구현 완
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedTab === '영양소') {
      if (!name || !calories || !carbs || !protein || !fat) {
        setError('모든 필수 입력란을 작성해주세요.');
        return;
      }
      if (isNaN(calories) || isNaN(carbs) || isNaN(protein) || isNaN(fat)) {
        setError('칼로리, 탄수화물, 단백질, 지방은 숫자여야 합니다.');
        return;
      }
      const foodData = {
        name,
        calories: parseInt(calories),
        carbs: parseInt(carbs),
        protein: parseInt(protein),
        fat: parseInt(fat),
        description,
      };

      const foodCollectionRef = collection(firestore, 'food');
      try {
        await addDoc(foodCollectionRef, {
          foodNm: foodData.name,
          enerc: foodData.calories,
          prot: foodData.protein,
          fatce: foodData.fat,
          chocdf: foodData.carbs,
          description: foodData.description,
        });

        setShowModal(false);
        setName('');
        setCalories('');
        setCarbs('');
        setProtein('');
        setFat('');
        setDescription('');
      } catch (error) {
        console.error('Error saving food:', error);
      }
    } else {
      if (!name || !type || !weight) {
        setError('모든 필수 입력란을 작성해주세요.');
        return;
      }
      if (isNaN(weight)) {
        setError('무게는 숫자여야 합니다.');
        return;
      }
      const trashData = { name, type, weight: parseInt(weight) };
      const trashCollectionRef = collection(firestore, 'trash');

      try {
        await addDoc(trashCollectionRef, {
          trName: trashData.name,
          trWeight: trashData.weight,
          trType: trashData.type,
        });

        setShowModal(false);
        setName('');
        setType('');
        setWeight('');
      } catch (error) {
        console.error('Error saving trash:', error);
      }
    }
  };

  return (
    <div className="db-search-container">
      <Header />
      
      <div className="content">
        <div className="left-panel">
          <ButtonGroup vertical className="button-group">
            <Button
              variant={selectedTab === '영양소' ? 'primary' : 'secondary'}
              onClick={() => {
                setSelectedTab('영양소');
                setSearchTerm('');
                setSearchResults([]);
              }}
              style={{fontSize: '20px', margin: '30px', border: '2px solid black', borderRadius: '5px', padding: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}
            >
              영양소
            </Button>
            
            <Button
              variant={selectedTab === '쓰레기' ? 'primary' : 'secondary'}
              onClick={() => {
                setSelectedTab('쓰레기');
                setSearchTerm('');
                setSearchResults([]);
              }}
              style={{fontSize: '20px',margin: '30px', border: '2px solid black', borderRadius: '5px', padding: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}
            >
              쓰레기
            </Button>
          </ButtonGroup>
        </div>
        <div className="main-panel">
        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            handleShowModal={handleShowModal}
            selectedTab={selectedTab}
            
          />
          <ResultList searchResults={searchResults} selectedTab={selectedTab} />
        </div>
      </div>
      <ModalForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        error={error}
        name={name}
        setName={setName}
        calories={calories}
        setCalories={setCalories}
        carbs={carbs}
        setCarbs={setCarbs}
        protein={protein}
        setProtein={setProtein}
        fat={fat}
        setFat={setFat}
        description={description}
        setDescription={setDescription}
        type={type}
        setType={setType}
        weight={weight}
        setWeight={setWeight}
        selectedTab={selectedTab}
      />
      <Footer />
    </div>
  );
}

export default DbSearch;
