import React, { useState } from 'react';
import './InputBox.css';

const InputBox = ({ id, label, name, type = 'text', value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">{label}</label>
      <input
        id={id}
        className="input-element"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;