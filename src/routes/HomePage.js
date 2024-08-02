import React from 'react';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import CalendarPanel from '../components/CalendarPanel';
import Footer from '../components/Footer';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <Header />
      <div className="content">
        <div className="left-panel">
          <InfoCard navigateTo="/nutrition-stats">7월 22일 영양소 통계</InfoCard>
          <InfoCard navigateTo="/consumption-stats">7월 22일 소비 통계</InfoCard>
          <InfoCard navigateTo="/waste-stats">7월 22일 쓰레기 통계</InfoCard>
        </div>
        <CalendarPanel />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
