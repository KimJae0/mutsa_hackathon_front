import React, { useState } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { db } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';

function NewMoney() {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isTrashChecked, setIsTrashChecked] = useState(false);
  const [isFoodChosen, setIsFoodChosen] = useState('');

  const handleCheckChange = (event) => {
    if (event.target.value === 'food') setIsFoodChecked(!isFoodChecked);
    else if (event.target.value === 'trash') setIsTrashChecked(!isTrashChecked);
  };

  const chooseFood = () => { };

  const handleSearch = async (event) => {
    event.preventDefault();

    /* const foodResults = [];
    const trashResults = [];
    const searchTerm = InputBox.value;
    if (isFoodChecked) {
      const querySnapshot = await getDocs(collection(db, "food"));
      
      querySnapshot.forEach((doc) => {


        const result = (doc.id, " => ", doc.data());

        if (result.foodNm.includes(searchTerm) || result.brand?.includes(searchTerm)) {
          foodResults.push(result);

        }
      });
      //setSearchResults(foodResults);
    }

    if (isTrashChecked) {
      const querySnapshot = await getDocs(collection(db, "trash"));
      querySnapshot.forEach((doc) => {

        const result = (doc.id, " => ", doc.data());

        if (result.trName.includes(searchTerm)) trashResults.push(result);

      });
    } */

  };


  return (
    <div>
      <InputBox id="cost" label="소비 금액" name="cost" />
      <label htmlFor="type">소비 유형</label>
      <Dropdown id="type" />
      <div>
        <InputBox id="content" label="소비 내용" name="content" />

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
        {isFoodChecked && !isTrashChecked && <div></div>}
        {isFoodChecked && isTrashChecked && <div></div>}
        {!isFoodChecked && isTrashChecked && <div></div>}
        {!isFoodChecked && !isTrashChecked}
        {isFoodChecked && isTrashChecked && isFoodChosen && <div></div>}
      </div>
    </div>
  );
}

export default NewMoney;
