import React from 'react'
import twitterLogo from '../images/twitter.png'
import './Login.css'
import Footer from '../components/Footer';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

const Login = () => {
    // State variables for email, password, and loading state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle login
    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password };
        // Send login request to the server
        axios.post(`${process.env.REACT_APP_API}/api/login`, requestData)
            .then((result) => {
                if (result.status === 200) {
                    // Store token and user data in localStorage
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.userInDB));
                    // Dispatch login success action
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.userInDB });
                    setLoading(false);
                    // Navigate to home page
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                // Display error message using toast
                toast.error("Invalid Credentials");
            })
    }

    return (
        <>
            <div className="container login-container">
                <Toaster />
                <div className="row">
                    <div className="col-lg-7 col-sm-12 d-flex justify-content-center align-item-center">
                        <img alt='TwitterLogo' className='twitterLogo' style={{ height: '85%' }} src={twitterLogo} />
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <div className="card shadow bg-dark text-light">
                            {loading ? <div className="col-md-12 mt-3 text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <div className="card-body px-5">
                                <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
                                <form onSubmit={(e) => login(e)}>
                                    <div className="form-floating mb-3 text-dark">
                                        <input type="email" className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" />
                                        <label >Email, Phone or User Name</label>
                                    </div>
                                    <div className="form-floating text-dark">
                                        <input type="password" className="form-control" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" />
                                        <label >Password</label>
                                    </div>
                                    <div className='mt-3 d-grid'>
                                        <button className="custom-btn fw-bold" type='submit'>Log In</button>
                                    </div>
                                </form>
                                <div className='my-2 d-flex'>
                                    <hr className='w-100' />
                                    <h5 className='text-center py-1 text-light'>or</h5>
                                    <hr className='w-100' />
                                </div>
                                <div className='mt-3 mb-5 d-grid'>
                                    <span className='fw-bold m-2'>Don't have an account?</span>
                                    {/* Link to Signup page */}
                                    <button className="custom-btn custom-btn-white">
                                        <Link to="/signup" className='ms-1 text-info fw-bold text-decoration-none'>Create account</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
