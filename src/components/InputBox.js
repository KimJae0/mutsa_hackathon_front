import React, { useState } from 'react';
import './InputBox.css';

const InputBox = ({ id, question, name }) => {
  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="input-container">
      <label htmlFor={id}>{question}</label>
      <input className={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputBox;
