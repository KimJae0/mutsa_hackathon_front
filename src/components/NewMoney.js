import React, { useState } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';

function NewMoney() {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isTrashChecked, setIsTrashChecked] = useState(false);
  const [isFoodChosen, setIsFoodChosen] = useState('');

  const handleCheckChange = (event) => {
    if (event.target === 'food') setIsFoodChecked(!isFoodChecked);
    else if (event.target === 'trash') setIsTrashChecked(!isTrashChecked);
  };

  const chooseFood = () => {};

  const handleSearch = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <InputBox id="cost" question="소비 금액" name="cost" />
      <label htmlFor="type">소비 유형</label>
      <Dropdown id="type" />
      <form onSubmit={handleSearch}>
        <InputBox id="content" question="소비 내용" name="content" />
        <input type="submit" value="검색"></input>
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
        {isFoodChecked && !isTrashChecked && <div></div>}
        {isFoodChecked && isTrashChecked && <div></div>}
        {!isFoodChecked && isTrashChecked && <div></div>}
        {!isFoodChecked && !isTrashChecked}
        {isFoodChecked && isTrashChecked && isFoodChosen && <div></div>}
      </form>
    </div>
  );
}

export default NewMoney;
