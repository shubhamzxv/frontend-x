import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import logo from '../images/twitter.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LeftSidebar = () => {
    const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions
    const navigate = useNavigate();
    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("user"); // Remove user data from local storage
        dispatch({ type: "LOGIN_ERROR" }); // Dispatch LOGIN_ERROR action to update Redux store
        navigate('/login');
    }
    return (
        <div style={{ width: "18%" }} className='d-none-md'>
            <div>
                <Link to='/'>
                    <img src={logo} alt="x" width={"30px"}  />
                </Link>
                <div className='text-decoration-none text-white'>
                    <Link to='/' className='d-flex my-4 text-decoration-none text-white'>
                        <div className='fs-4 btn-blue-hover'><IoHomeOutline /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Home</div>
                    </Link>
                    <div className='d-flex my-4'>
                        <div className='fs-4 btn-blue-hover'><FaHashtag /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Explore</div>
                    </div>
                    <div className='d-flex my-4' >
                        <div className='fs-4 btn-blue-hover'><IoMdNotificationsOutline /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Notifications</div>
                    </div>
                    <Link to='/profile' className='d-flex my-4 text-decoration-none text-white'>
                        <div className='fs-4 btn-blue-hover'><FaRegUser /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Profile</div>
                    </Link>
                    <Link to='/bookmark' className='d-flex my-4 text-decoration-none text-white'>
                        <div className='fs-4 btn-blue-hover'><FaRegBookmark /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Bookmarks</div>
                    </Link>
                    <div className='d-flex my-4' onClick={(e) => logout()}>
                        <div className='fs-4 btn-blue-hover'><RiLogoutBoxRLine /></div>
                        <div className='fw-bold ms-2 py-2 btn-blue-hover'>Logout</div>
                    </div>
                    <button className='btn btn-info my-2 border-none text-center w-100 rounded-pill fw-bold'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar