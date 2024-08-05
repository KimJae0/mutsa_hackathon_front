import React, { useState, useContext, useEffect } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { firestore } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { RecordContext } from '../routes/Add';

function NewMoney() {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isTrashChecked, setIsTrashChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [foodResults, setFoodResults] = useState([]);
  const [trashResults, setTrashResults] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState('');
  const [selectedTrashItem, setSelectedTrashItem] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [foodOutput, setFoodOutput] = useState('foodoutput');
  const records = useContext(RecordContext);

  const handleCheckChange = (event) => {
    if (event.target.value === 'food') setIsFoodChecked(!isFoodChecked);
    else if (event.target.value === 'trash') setIsTrashChecked(!isTrashChecked);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setHasSearched(true);
    let foodResults = [];
    let trashResults = [];

    if (isFoodChecked) {
      const querySnapshot = await getDocs(collection(firestore, 'food'));
      querySnapshot.forEach((doc) => {
        const result = doc.data();
        const title = (result.brand + result.foodNm).replace(/\s/g, '');
        if (title.includes(searchTerm.replace(/\s/g, ''))) {
          foodResults.push(result);
        }
      });

      if (foodResults.length < 3) {
        foodResults.push({ foodNm: '새로운 음식 추가하기' });
      }
      setFoodResults(foodResults.slice(0, 3));
    } else {
      setFoodResults([]);
    }

    if (isTrashChecked) {
      const querySnapshot = await getDocs(collection(firestore, 'trash'));
      querySnapshot.forEach((doc) => {
        const result = doc.data();
        const title = (result.brand + result.trName).replace(/\s/g, '');
        if (title.includes(searchTerm.replace(/\s/g, ''))) {
          trashResults.push(result);
        }
      });
      if (trashResults.length < 3) {
        trashResults.push({ trName: '새로운 쓰레기 항목 추가하기' });
      }
      setTrashResults(trashResults.slice(0, 3));
    } else {
      setTrashResults([]);
    }
  };

  const handleFoodResultClick = (result) => {
    if (result.foodNm === '새로운 음식 추가하기') {
      // Handle new food item addition
    } else {
      setSelectedFoodItem(result.foodNm);
    }
    setFoodResults([]);
  };

  const handleTrashResultClick = (result) => {
    if (result.trName === '새로운 쓰레기 항목 추가하기') {
      // Handle new trash item addition
    } else {
      setSelectedTrashItem(result.trName);
    }
    setTrashResults([]);
  };

  useEffect(() => {
    if (hasSearched) {
      // Log the results to ensure the state has been updated correctly
      console.log('Food Results:', foodResults);
      console.log('Trash Results:', trashResults);
    }
  }, [foodResults, trashResults, hasSearched]);

  return (
    <div>
      <InputBox id="cost" label="소비 금액" name="cost" />
      <label htmlFor="type">소비 유형</label>
      <Dropdown id="type" />
      <div>
        <InputBox
          id="content"
          label="소비 내용"
          name="content"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div>
          <input
            type="checkbox"
            id="food"
            name="extra"
            value="food"
            checked={isFoodChecked}
            onChange={handleCheckChange}
          />
          <label htmlFor="food">음식</label>
          <input
            type="checkbox"
            id="trash"
            name="extra"
            value="trash"
            checked={isTrashChecked}
            onChange={handleCheckChange}
          />
          <label htmlFor="trash">쓰레기</label>
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>
      {hasSearched && (
        <div>
          {isFoodChecked && (
            <>
              {foodResults.length > 0 && (
                <div className="search-results">
                  {foodResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleFoodResultClick(result)}
                    >
                      {result.foodNm}{' '}
                      {result.enerc ? ` - ${result.enerc}kcal` : ''}
                    </div>
                  ))}
                </div>
              )}
              <div>선택된 음식 항목: {selectedFoodItem}</div>
            </>
          )}
          {isTrashChecked && (
            <>
              {trashResults.length > 0 && (
                <div className="search-results">
                  {trashResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleTrashResultClick(result)}
                    >
                      {result.trName}{' '}
                      {result.category ? ` - ${result.category}` : ''}
                    </div>
                  ))}
                </div>
              )}
              <div>선택된 쓰레기 항목: {selectedTrashItem}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NewMoney;
