import React from "react";
import twitterLogo from '../images/twitter.png'
import './nav.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaHashtag, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";

const NavBar = () => {
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
    <div className="d-none-lg">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to='/'>
            <img alt='TwitterLogo' className="me-1" style={{ width: 50 }} src={twitterLogo} />
          </Link>
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Twitter</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body justify-content-end">
                <ul className="navbar-nav my-2 mb-2 mb-lg-0">
                  <NavLink to='/' className='d-flex text-decoration-none text-white'>
                    <div className='fs-4 btn-blue-hover'><IoHomeOutline /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Home</div>
                  </NavLink>
                  <div className='d-flex my-2'>
                    <div className='fs-4 btn-blue-hover'><FaHashtag /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Explore</div>
                  </div>
                  <div className='d-flex my-2' >
                    <div className='fs-4 btn-blue-hover'><IoMdNotificationsOutline /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Notifications</div>
                  </div>
                  <Link to='/profile' className='d-flex my-2 text-decoration-none text-white'>
                    <div className='fs-4 btn-blue-hover'><FaRegUser /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Profile</div>
                  </Link>
                  <NavLink to='/bookmark' className='my-2 d-flex text-decoration-none text-white'>
                    <div className='fs-4 btn-blue-hover'><FaRegBookmark /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Bookmarks</div>
                  </NavLink>
                  <div className='d-flex my-2' onClick={(e) => logout()}>
                    <div className='fs-4 btn-blue-hover'><RiLogoutBoxRLine /></div>
                    <div className='fw-bold ms-2 py-2 btn-blue-hover'>Logout</div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
