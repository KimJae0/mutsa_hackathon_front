import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

function ModalForm({
showModal, handleCloseModal, handleSubmit, error,
name, setName, calories, setCalories, carbs, setCarbs,
protein, setProtein, fat, setFat, description, setDescription,
type, setType, weight, setWeight, selectedTab
}) {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title>새로운 {selectedTab === '영양소' ? '음식 정보' : '쓰레기 정보'} 등록하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <label>
        이름:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {selectedTab === '영양소' ? (
        <>
        <label>
            칼로리:
            <input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </label>
        <label>
            탄수화물:
            <input type="text" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
        </label>
        <label>
            단백질:
            <input type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
        </label>
        <label>
            지방:
            <input type="text" value={fat} onChange={(e) => setFat(e.target.value)} />
        </label>
        <label>
            상세설명:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        </>
        ) : (
        <>
        <label>
            유형:
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>
            무게:
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        </>
        )}
        <Button type="submit">등록하기</Button>
        </form>
        </Modal.Body>
        </Modal>
    );
}

export default ModalForm;
