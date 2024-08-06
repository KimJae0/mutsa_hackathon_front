import React from 'react';
import './Mypage.css';
import Header from '../components/Header';
import InputBox from '../components/InputBox';
import Footer from '../components/Footer';

function Mypage() {
  return (
    <div className="mypage-wrapper">
      <Header />
      <div className="mypage-container">
        <div className="mypage-content">
          <section className="mypage-section">
            <h2>
              계정 연동 하기{' '}
              <span role="img" aria-label="icon">
                👋
              </span>
            </h2>
            <p>계정 본인에 대비하여 다른 sns 계정을 연동해주세요</p>
            <div className="mypage-button-group">
              <button className="mypage-kakao-button">
                카카오 아이디로 연동
              </button>
              <button className="mypage-naver-button">
                네이버 아이디로 연동
              </button>
              <button className="mypage-google-button">구글 아이디로</button>
            </div>
          </section>

          <section className="mypage-section">
            <h2>비밀번호 변경</h2>
            <InputBox
              id="current-password"
              label="현재 비밀번호"
              name="current-password"
            />
            <InputBox
              id="new-password"
              label="새 비밀번호"
              name="new-password"
            />
            <InputBox
              id="confirm-password"
              label="새 비밀번호를 확인해주세요"
              name="confirm-password"
            />
          </section>

          <section className="mypage-section">
            <h2>
              프리미엄 결제 서비스{' '}
              <span role="img" aria-label="icon">
                👋
              </span>
            </h2>
            <p>
              현재 프리미엄 서비스에 가입되어 있지 않습니다. 다양한 서비스들을
              체험하기 위해서 프리미엄 서비스를 구독해주세요
            </p>
            <button className="mypage-premium-button">
              프리미엄 서비스 구독하러 가기
            </button>
          </section>

          <section className="mypage-section">
            <h2>우리 서비스와 함께 해요</h2>
            <div className="mypage-button-group">
              <button className="mypage-flexsite-button">
                웹사이트 칭찬하기
              </button>
              <button className="mypage-maketeam-button">만든이들</button>
              <button className="mypage-feedback-button">의견내기</button>
            </div>
          </section>

          <section className="mypage-section">
            <h2>푸시 알림 설정</h2>
          </section>

          <section className="mypage-section">
            <h2>
              환불 계좌 관리{' '}
              <span role="img" aria-label="icon">
                👋
              </span>
            </h2>
          </section>

          <section className="mypage-section">
            <h2>가계부 엑셀로 내보내기</h2>
          </section>

          <section className="mypage-section">
            <h2>회원 탈퇴</h2>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
