import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const onButtonClick = () => {
        // You'll update this function later...
    }

    return (
        <div className="container">
            <div className="login-card">
                <h2 className="card-title text-center">Login</h2>
                <form>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Email address"
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Password"
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" type="button" onClick={onButtonClick}>
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login