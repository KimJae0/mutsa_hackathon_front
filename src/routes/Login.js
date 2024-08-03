import React, { useState } from 'react';
import './Login.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 로그인 처리 로직을 여기에 추가합니다.
        console.log(formValues);
        // 로그인 후 홈 페이지로 이동
        navigate('/home');
    };

    return (
        <div className="login-container">
            <div className="logo-placeholder">기막힌 로고/서비스 이름</div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                <ButtonGroup>
                    <Button variant="subtle" type="submit">
                        Login
                    </Button>
                    <Button variant="primary" onPress={() => navigate('/signup')}>
                        Sign up
                    </Button>
                </ButtonGroup>
                <Button variant="primary" onPress={() => console.log('구글로 시작하기')} className="google-login-button">
                    구글로 시작하기
                </Button>
            </form>
        </div>
    );
}

export default Login;