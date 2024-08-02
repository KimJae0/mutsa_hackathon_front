import { useState } from 'react';

function Dropdown() {
  const options = [
    { value: 'foodExpense', name: '식비' },
    { value: 'transportationFee', name: '교통비' },
    { value: 'clothesExpense', name: '의류' },
    { value: 'leisureExpense', name: '여가' },
    { value: 'etcExpense', name: '기타' },
  ];

  const [selType, setSelType] = useState();

  const onTypeChange = (type) => {
    setSelType(type);
  };

  return (
    <select onChange={onTypeChange}>
      <option value="">소비 유형을 선택하여 주세요.</option>
      {options.map((option) => (
        <option name="type" value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
// value가 빈 문자열일 경우 db에 저장 안 되게 해야함
export default Dropdown;
