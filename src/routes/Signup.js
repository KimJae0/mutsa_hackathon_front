import React, { useState } from 'react';
import './Signup.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { firestore } from '../config/firebase';
import logo from '../asset/ssuik-logo.png';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: '',
    username: '',
    password: '',
    birthdate: '',
    email: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const userCollectionRef = collection(firestore, 'users');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(name, value, type, checked);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 처리 로직을 여기에 추가합니다.

    signUp();

    // 회원가입 후 로그인 페이지로 이동
    navigate('/login');
  };

  // 회원가입
  const signUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formValues.email,
      formValues.password
    );
    const user = userCredential.user;

    //users db에 사용자 정보 추가
    await addDoc(userCollectionRef, {
      info: {
        userName: formValues.name,
        email: formValues.email,
        birthday: formValues.birthdate,
        nickname: formValues.username,
        uid: user.uid,
        password: formValues.password,
      },
    });

    //자동으로 로그인되니까 다시 로그아웃시키기
    signOut(auth);
  };

  return (
    <div className="signup-container">
      <img src={logo} className="w-20 mt-2 mb-3"></img>
      <form onSubmit={handleSubmit} className="signup-form">
        <p className="text-lg place-self-center mb-8">회원가입</p>
        <InputBox
          label="이름"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <InputBox
          label="아이디"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        <InputBox
          label="비밀번호"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <InputBox
          label="생년월일"
          type="date"
          name="birthdate"
          value={formValues.birthdate}
          onChange={handleChange}
        />
        <InputBox
          label="이메일"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <div className="checkbox-group ml-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formValues.termsAccepted}
            onChange={handleChange}
          />
          <label>이용 약관 동의</label>
        </div>
        <div className="checkbox-group ml-2">
          <input
            type="checkbox"
            name="privacyAccepted"
            checked={formValues.privacyAccepted}
            onChange={handleChange}
          />
          <label>개인정보 수집 동의</label>
        </div>
        <div className="flex justify-center space-x-5 items-center mt-3 ml-1.5">
          <button
            className="bg-slate-300 text-white rounded-full py-3 w-40"
            onClick={() => navigate('/')}
          >
            취소
          </button>
          <button
            className="bg-black text-white rounded-full py-3 w-40 mt-0"
            type="submit"
          >
            가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
