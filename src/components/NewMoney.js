import React, { useState } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

function NewMoney() {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isTrashChecked, setIsTrashChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleCheckChange = (event) => {
    if (event.target.value === 'food') setIsFoodChecked(!isFoodChecked);
    else if (event.target.value === 'trash') setIsTrashChecked(!isTrashChecked);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    let foodResults = [];
    let trashResults = [];
    
    if (isFoodChecked) {
      const querySnapshot = await getDocs(collection(db, "food"));
      querySnapshot.forEach((doc) => {
        const result = doc.data();
        const title = (result.brand + result.foodNm).replace(/\s/g, "");
        if (title.includes(searchTerm.replace(/\s/g, ""))) {
          foodResults.push(result);
        }
      });
    }

    if (isTrashChecked) {
      const querySnapshot = await getDocs(collection(db, "trash"));
      querySnapshot.forEach((doc) => {
        const result = doc.data();
        const title = (result.brand + result.trName).replace(/\s/g, "");
        if (title.includes(searchTerm.replace(/\s/g, ""))) {
          trashResults.push(result);
        }
      });
    }

    setSearchResults([...foodResults, ...trashResults].slice(0, 3)); // 최대 3개의 결과만 보여줌
  };

  const handleResultClick = (result) => {
    setSelectedItem(result.foodNm || result.trName);
    setSearchResults([]);
  };

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
      <div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div key={index} onClick={() => handleResultClick(result)}>
                {result.foodNm || result.trName}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        선택된 항목: {selectedItem}
      </div>
    </div>
  );
}

export default NewMoney;
