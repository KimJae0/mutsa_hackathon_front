import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function DayModal({ show, handleClose, selectedDate, dayDetails }) {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Day Details"
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-10"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {selectedDate ? selectedDate.toLocaleDateString() : ''}의 기록
        </h2>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          닫기
        </button>
      </div>
      <div>
        {dayDetails ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">소비내용</h3>
              <ul className="list-disc pl-5 space-y-1">
                {dayDetails.consumption.map((item, index) => (
                  <li key={index}>{`내용: ${item.content}, 비용: ${item.cost}, 유형: ${item.option}`}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">쓰레기배출량</h3>
              <ul className="list-disc pl-5 space-y-1">
                {dayDetails.waste.map((item, index) => (
                  <li key={index}>{`종류: ${item.trType}, 무게: ${item.trWeight}, 이름: ${item.trName}`}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">먹은 거 기록</h3>
              <ul className="list-disc pl-5 space-y-1">
                {dayDetails.foodRecords.map((item, index) => (
                  <li key={index}>{`브랜드: ${item.brand}, 음식 이름: ${item.foodNm}, 에너지: ${item.enerc}, 나트륨: ${item.nat}, 단백질: ${item.prot}, 설탕: ${item.sugar}`}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>기록이 없습니다.</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate('/edit')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          수정하기
        </button>
      </div>
    </Modal>
  );
}

export default DayModal;
