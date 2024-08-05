import React, { useState, useEffect} from 'react';
import './Login.css';
import InputBox from '../components/InputBox';
import { ButtonGroup, Button } from '../components/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [user, setUser] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        //console.log(event.target); 
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }; 


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
            setUser(userCredential.user);
            navigate('/');  // 로그인 후 UserData 페이지로 이동
            
        } catch (err) {
            console.error('Error logging in with email and password', err);
        }
    };


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // 로그인 처리 로직을 여기에 추가합니다.
    //     //console.log(formValues);
    //     signIn();
    //     // 로그인 후 홈 페이지로 이동
    //     navigate('/');
    // };

    const signInGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            navigate('/');  // Google 로그인 후 UserData 페이지로 이동
        } catch(err) {
            console.error(err);
        }
        
    };

    useEffect(() => {
        // 현재 로그인된 사용자 정보 설정
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    }, []);

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
                <Button variant="primary" onPress={signInGoogle} className="google-login-button">
                    구글로 시작하기
                </Button>
            </form>
        </div>
    );
}

export default Login;