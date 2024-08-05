import React, { useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import CalendarPanel from '../components/CalendarPanel';
import Footer from '../components/Footer';
import './HomePage.css';
import { useUser } from '../context/UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getUserInfoByEmail = async (email) => {
  try {
    console.log('Fetching user info for email:', email);
    const q = query(collection(firestore, 'users'), where('info.email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // 첫 번째 문서만 가져옴
      console.log('User document ID:', userDoc.id);
      console.log('User data:', userDoc.data());
      return userDoc.data().info.nickname;
    } else {
      console.log('No such document!');
      return '';
    }
  } catch (error) {
    console.log('Error getting document:', error);
    return '';
  }
};

function HomePage() {
  const { user } = useUser();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        console.log('User is logged in. User email:', user.email);
        const fetchedNickname = await getUserInfoByEmail(user.email);
        if (fetchedNickname) {
          console.log('Fetched nickname:', fetchedNickname);
          setNickname(fetchedNickname);
        } else {
          console.log('No nickname found for user.');
        }
      } else {
        console.log('User is not logged in.');
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="content">
        <div className="left-panel">
          {nickname ? (
            <div className="user-nickname">
              {nickname} 님
            </div>
          ) : (
            <div className="user-nickname">Loading...</div>
          )}
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
