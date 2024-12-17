import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './login.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const onButtonClick = () => {
        // You'll update this function later...
    };

    return (
        <MDBContainer fluid className="full-screen-container p-0">
            <MDBRow className='g-0 h-100'>
                <MDBCol col='6' className="left-column">
                    <div className="d-flex flex-column justify-content-center h-100 px-4 py-5">
                        <div className="text-center mb-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                className="logo-img" alt="logo" />
                            <h2 className="mt-3">We are The Lotus Team</h2>
                        </div>

                        <h4 className="mb-4">Please login to your account</h4>

                        <MDBInput 
                            wrapperClass='mb-4' 
                            label='Email address' 
                            id='form1' 
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="text-danger mb-2">{emailError}</div>}

                        <MDBInput 
                            wrapperClass='mb-4' 
                            label='Password' 
                            id='form2' 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="text-danger mb-2">{passwordError}</div>}

                        <div className="text-center mb-4">
                            <MDBBtn className="w-100 gradient-custom-2" onClick={onButtonClick}>Sign in</MDBBtn>
                        </div>

                        <div className="text-center mb-4">
                            <a className="text-muted" href="#!">Forgot password?</a>
                        </div>

                        <div className="text-center">
                            <p className="mb-2">Don't have an account?</p>
                            <MDBBtn outline color='danger'>
                                Sign Up
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>

                <MDBCol col='6' className="right-column">
                    <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 px-4 py-5">
                        <h3 className="text-white mb-4">We are more than just a company</h3>
                        <p className="text-white">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;