// ResultItem.js
import React, { useState } from 'react';

const ResultItem = ({ item, selectedTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="result-item">
      <div className="result-item-header" onClick={toggleDetails}>
        {selectedTab === '영양소' ? item.foodNm : item.trName}
        <button className="toggle-button">{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && (
        <div className="result-item-details">
          {selectedTab === '영양소' && (
            <div>
              <p>칼로리: {item.enerc}</p>
              <p>탄수화물: {item.chocdf}</p>
              <p>단백질: {item.prot}</p>
              <p>지방: {item.fatce}</p>
              
            </div>
          )}
          {selectedTab === '쓰레기' && (
            <div>
              <p>무게: {item.trWeight}</p>
              <p>종류: {item.trType}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultItem;
