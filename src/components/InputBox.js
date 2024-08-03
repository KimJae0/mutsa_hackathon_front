import React from 'react';
import './InputBox.css';

const InputBox = ({ label, name, type, value, onChange }) => {
  return (
    <div className="input-container">
      
      <input label={label} name={name} type={type} className="input-element" value={value} onChange={onChange} />
    </div>
  );
};

export default InputBox;
