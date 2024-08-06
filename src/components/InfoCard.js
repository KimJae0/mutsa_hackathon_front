import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoCard({ title, data, children, navigateTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md w-full max-w-md p-6 mb-6 ${navigateTo ? 'cursor-pointer' : ''}`} 
      onClick={handleClick}
    >
      {title && <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>}
      {data ? (
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className={`w-2.5 h-2.5 rounded-full inline-block ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-orange-500'}`}></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default InfoCard;
