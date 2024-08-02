import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

function SearchBar({ searchTerm, setSearchTerm, handleSearch, handleShowModal, selectedTab }) {
    return (
        <InputGroup className="mb-3">
        <FormControl
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
            검색
        </Button>
        <Button variant="primary" onClick={handleShowModal} style={{ marginLeft: '10px' }}>
            새로운 {selectedTab === '영양소' ? '음식' : '쓰레기'} 등록하기
        </Button>
        </InputGroup>
    );
}

export default SearchBar;
