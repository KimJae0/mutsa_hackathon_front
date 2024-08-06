import React, { useState, useEffect, useContext } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { firestore } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { RecordsContext } from '../routes/Add';
import './InputBox.css';

function NewMoney() {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isTrashChecked, setIsTrashChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [foodResults, setFoodResults] = useState([]);
  const [trashResults, setTrashResults] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState('');
  const [selectedTrashItem, setSelectedTrashItem] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [cost, setCost] = useState();
  const [foodOutput, setFoodOutput] = useState();
  const [moneyOutput, setMoneyOutput] = useState();
  const [trashOutput, setTrashOutput] = useState();
  const records = useContext(RecordsContext);
  const [selType, setSelType] = useState();

  const handleCheckChange = (event) => {
    if (event.target.value === 'food') setIsFoodChecked(!isFoodChecked);
    else if (event.target.value === 'trash') setIsTrashChecked(!isTrashChecked);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    setMoneyOutput({
      content: searchTerm,
      cost: cost,
      option: selType,
    });

    console.log(moneyOutput);

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
      setFoodOutput(result);
      console.log(result);
    }
    setFoodResults([]);
  };

  const handleTrashResultClick = (result) => {
    if (result.trName === '새로운 쓰레기 항목 추가하기') {
      // Handle new trash item addition
    } else {
      setSelectedTrashItem(result.trName);
      setTrashOutput(result);
    }
    setTrashResults([]);
  };

  const handleRecord = (event) => {
    event.preventDefault();
    const record = {
      ...(foodOutput !== undefined && { food: foodOutput }),
      ...(trashOutput !== undefined && { trash: trashOutput }),
      money: moneyOutput,
    };

    records.push(record);

    console.log(records);
  };

  useEffect(() => {
    if (hasSearched) {
      // Log the results to ensure the state has been updated correctly
      console.log('Food Results:', foodResults);
      console.log('Trash Results:', trashResults);
    }
  }, [foodResults, trashResults, hasSearched]);

  const options = [
    { value: 'foodExpense', name: '식비' },
    { value: 'transportationFee', name: '교통비' },
    { value: 'clothesExpense', name: '의류' },
    { value: 'leisureExpense', name: '여가' },
    { value: 'etcExpense', name: '기타' },
  ];

  const onTypeChange = (type) => {
    setSelType(type.target.value);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* 상단 두 요소를 수평으로 배치하고 높이를 맞춥니다 */}
      <div className="flex gap-24">
        <div className="flex-1">
          <InputBox
            id="cost"
            label="소비 금액"
            name="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="type"
            className="block text-gray-700"
            style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#333' }}
          >
            소비 유형
          </label>
          <select
            onChange={onTypeChange}
            className="input-element mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">소비 유형을 선택하여 주세요.</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 나머지 요소들 */}
      <div className="flex flex-col gap-2 border-b-2">
        <InputBox
          id="content"
          label="소비 내용"
          name="content"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex items-center justify-between ml-2 mb-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="food"
                name="extra"
                value="food"
                checked={isFoodChecked}
                onChange={handleCheckChange}
              />
              <label htmlFor="food">음식</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trash"
                name="extra"
                value="trash"
                checked={isTrashChecked}
                onChange={handleCheckChange}
              />
              <label htmlFor="trash">쓰레기</label>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="ml-4 bg-black text-white px-4 py-2 rounded mr-4"
          >
            검색
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRecord}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-40 my-6"
          >
            소비 입력 완료
          </button>
        </div>
      </div>
      {hasSearched && (
        <div className="mt-4">
          {isFoodChecked && (
            <>
              {foodResults.length > 0 && (
                <div className="search-results">
                  {foodResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleFoodResultClick(result)}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
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
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
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
