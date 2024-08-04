import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DayModal.css';
import { useNavigate } from 'react-router-dom';

function DayModal({ show, handleClose, selectedDate, dayDetails }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedDate ? selectedDate.toLocaleDateString() : ''}의 기록
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dayDetails ? (
          <>
            <p>소비내용: 오전 11시 20분 아이스아메리카노</p>
            <p>오후 1시 20분 샐러드</p>
            <p>오후 5시 다이스</p>
            <div>
              <ul>
                <li>플라스틱 컵 1개 (오전 11시 20분 아이스아메리카노)</li>
                <li>쓰레기배출량</li>
                <li>쓰레기배출량</li>
                <li>쓰레기배출량</li>
                <li>쓰레기배출량</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>먹은 거 기록1</li>
                <li>먹은 거 기록2</li>
                <li>먹은 거 기록3</li>
                <li>먹은 거 기록4</li>
              </ul>
            </div>
          </>
        ) : (
          <p>기록이 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="link" onClick={() => navigate('/edit')}>
          수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DayModal;
