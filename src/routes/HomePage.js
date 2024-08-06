import React, { useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import CalendarPanel from '../components/CalendarPanel';
import Footer from '../components/Footer';
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
    <div className="homepage-container font-sans">
      <Header />
      <div className="content flex">
        <div className="left-panel">
          <InfoCard>
            {nickname ? (
              <div className="user-nickname text-2xl font-semibold">
                {nickname} 님
              </div>
            ) : (
              <div className="user-nickname text-2xl font-semibold">Loading...</div>
            )}
          </InfoCard>
          <InfoCard navigateTo="/nutrition-stats" title="7월 22일 영양소 통계" data={["탄", "단", "지"]} />
          <InfoCard navigateTo="/consumption-stats" title="7월 22일 소비 통계" data={["의류", "교통", "식비"]} />
          <InfoCard navigateTo="/waste-stats" title="7월 22일 쓰레기 통계" data={["플라스틱"]} />
        </div>
        <CalendarPanel />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
