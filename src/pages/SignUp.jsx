import React from 'react'
import twitterLogo from '../images/twitter.png'
import './Signup.css'
import Footer from '../components/Footer';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'
import axios from 'axios'
import toast from 'react-hot-toast';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State variable to control loading indicator visibility
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Access to React Router navigation function

    // Function to handle form submission and register user
    const register = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Show loading indicator

        const requestData = { fullName, username, gender, email, password, phone }; // Prepare request data

        axios
            .post(`${API_BASE_URL}/api/register`, requestData)
            .then((result) => {
                if (result.status === 201) { // Check for successful registration
                    setLoading(false); // Hide loading indicator
                    toast.success("register successful");// Display success message
                    navigate("/login"); // Redirect to login page
                }
            })
            .catch((error) => {
                console.log(error); // Log any errors
                setLoading(false); // Hide loading indicator
                toast.error("something went wrong"); // Display error message using toast
            });
    };

    return (
        <><div className="container login-container">
            <div className="row">
                <div className="col-lg-7 col-sm-12 d-flex justify-content-center align-item-center">
                    <img alt='TwitterLogo' className='twitterLogo' style={{ height: '50%' }} src={twitterLogo} />
                </div>
                <div className="col-lg-5 col-sm-12">
                    <div className="card shadow bg-dark text-light">
                        {loading ? <div className="col-md-12 mt-3 text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                            <form onSubmit={(e) => register(e)}>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="text" className="form-control" value={fullName} onChange={(ev) => setFullName(ev.target.value)} placeholder="First fullName" />
                                    <label>Full Name</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="text" className="form-control" value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="Last fullName" />
                                    <label >User Name</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="phone" className="form-control" value={phone} onChange={(ev) => setPhone(ev.target.value)} placeholder="Phone phone" />
                                    <label >Phone Number</label>
                                </div>
                                
                                <div className="form-floating mb-3 ">
                                    <select className="form-select" value={gender} onChange={(ev) => setGender(ev.target.value)} aria-label="Floating label select example">
                                        <option selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <label htmlFor="floatingSelect">Gender</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="email" className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" />
                                    <label >Email</label>
                                </div>
                                <div className="form-floating text-dark">
                                    <input type="password" className="form-control" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" />
                                    <label >Password</label>
                                </div>
                                <div className='mt-3 d-grid'>
                                    <button className="custom-btn fw-bold" type='submit'>Sign Up</button>
                                </div>
                            </form>
                            <div className='my-2 d-flex'>
                                <hr className='w-100' />
                                <h5 className='text-center py-1 text-light'>or</h5>
                                <hr className='w-100' />
                            </div>
                            <div className='mt-3 mb-5 d-grid'>
                                <span className='fw-bold m-2'>Already have an account?? </span>
                                <button className="custom-btn custom-btn-white">
                                    <Link to="/login" className='ms-1 text-info fw-bold text-decoration-none'>Log In</Link>
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

export default SignUp