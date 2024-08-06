import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

function SearchBar({ searchTerm, setSearchTerm, handleSearch, handleShowModal, selectedTab }) {
    return (
        <InputGroup className="mb-3" style={{position: 'relative', left: '-30px'}}>
        <FormControl
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{marginRight: '100px', border: '2px solid black', }}
        />
        <Button variant="outline-secondary" onClick={handleSearch} style={{fontSize: '15px',margin: '15px', border: '2px solid blue', borderRadius: '5px', padding: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', background: 'blue', color: 'white'}}>
            검색
            
        </Button>
        <Button variant="primary" onClick={handleShowModal} style={{ marginLeft: '5px', fontSize: '15px',margin: '10px', border: '2px solid black', borderRadius: '5px', padding: '10px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', background: 'black', color: 'white' }}>
            새로운 {selectedTab === '영양소' ? '음식' : '쓰레기'} 등록하기
        </Button>
        </InputGroup>
    );
}

export default SearchBar;
