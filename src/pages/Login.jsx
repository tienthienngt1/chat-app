import React from 'react';
import HeaderLogin from '../components/login/HeaderLogin';
import LoginButton from '../components/login/LoginButton';
import Footer from "../components/common/Footer"

const Login = () => {
    return (
        <>
            <HeaderLogin />
            <LoginButton />
            <Footer />
        </>
    );
};

export default Login;