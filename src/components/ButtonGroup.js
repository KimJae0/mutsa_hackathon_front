import React from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ children }) => {
  return <div className="button-group">{children}</div>;
};

const Button = ({ onPress, variant, children }) => {
  return (
    <button className={`button ${variant}`} onClick={onPress}>
      {children}
    </button>
  );
};

export { ButtonGroup, Button };
