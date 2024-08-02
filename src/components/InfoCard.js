import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoCard.css';

function InfoCard({ children, navigateTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="info-card" onClick={handleClick}>
      {children}
    </div>
  );
}

export default InfoCard;
