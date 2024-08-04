import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        TRADE
      </Link>
      <ButtonGroup className="navbar-buttons">
        <Button variant="link" onClick={() => navigateTo('/mypage')}>
          마이페이지
        </Button>
        <Button variant="link" onClick={() => navigateTo('/add')}>
          기록 추가하기
        </Button>
        <Button variant="link">영양소 통계</Button>
        <Button variant="link">쓰레기 통계</Button>
        <Button variant="link">소비 통계</Button>
        <Button variant="link" onClick={() => navigateTo('/dbsearch')}>
          DB 검색
        </Button>
        <Button variant="link">Sign Up</Button>
      </ButtonGroup>
    </header>
  );
}

export default Header;
