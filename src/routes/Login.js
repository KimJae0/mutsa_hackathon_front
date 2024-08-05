import React, { useState } from 'react';
import './Login.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        //console.log(event.target); 
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }; 

    const handleSubmit = (event) => {
        event.preventDefault();
        // 로그인 처리 로직을 여기에 추가합니다.
        //console.log(formValues);
        signIn().then(navigate('/'));
        console.log(auth?.currentUser?.email);
        // 로그인 후 홈 페이지로 이동
        
    };



    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
        } catch(err) {
            console.error(err);
        }
        //console.log(auth.currentUser.email);
    };

    return (
        <div className="login-container">
            <div className="logo-placeholder">기막힌 로고/서비스 이름</div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <InputBox
                    label="이메일"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <InputBox
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <ButtonGroup>
                    <Button variant="subtle" onPress={signIn} type="submit">
                        Login
                    </Button>
                    <Button variant="primary" onPress={() => navigate('/signup')}>
                        Sign up
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default Login;