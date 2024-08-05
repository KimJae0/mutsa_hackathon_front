import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import logo from '../asset/ssuik-logo.png';

function Header() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="border-b-2 flex justify-between place-items-center">
      <Link to="/home" className="navbar-brand flex">
        <img src={logo} className="w-12 mt-3 mb-3 ml-10"></img>
        {/* <p className="text-3xl font-extrabold italic antialiased ml-2">지갑</p> */}
      </Link>

      <ButtonGroup className="flex float-right text-black space-x-16 mr-10 font-medium  align-middle">
        <Button
          variant="link"
          onClick={() => navigateTo('/mypage')}
          className="h-10"
        >
          마이페이지
        </Button>
        <Button
          variant="link"
          onClick={() => navigateTo('/add')}
          className="h-10"
        >
          기록 추가하기
        </Button>
        <Button
          variant="link"
          onClick={() => navigateTo('/nutrition-stats')}
          className="h-10"
        >
          영양소 통계
        </Button>
        <Button
          variant="link"
          onClick={() => navigateTo('/waste-stats')}
          className="h-10"
        >
          쓰레기 통계
        </Button>
        <Button
          variant="link"
          onClick={() => navigateTo('/consumption-stats')}
          className="h-10"
        >
          소비 통계
        </Button>
        <Button
          variant="link"
          onClick={() => navigateTo('/dbsearch')}
          className="h-10"
        >
          DB 검색
        </Button>
        <Button
          variant="link"
          onClick={() => {
            logOut();
            navigateTo('/login');
          }}
          className="font-normal border-2 rounded border-black border-solid w-20 h-10"
        >
          Log out
        </Button>
      </ButtonGroup>
    </header>
  );
}

export default Header;
