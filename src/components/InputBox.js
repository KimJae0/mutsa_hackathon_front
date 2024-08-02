import React from 'react';
import './InputBox.css';

const InputBox = ({ value, onChange }) => {
  return (
    <div className="input-container">
      
      <input className="input-element" value={value} onChange={onChange} />
    </div>
  );
};

export default InputBox;
