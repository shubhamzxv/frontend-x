import React from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileDetails = () => {
    const user = useSelector(state => state.userReducer);
    return (
        <div style={{ width: "50%" }} className='border border-dark'>
            <div className='mb-0 p-2'>
                <div className='d-flex'>
                    <Link to="/" className='text-decoration-none text-white'>
                        <IoMdArrowBack className='fs-3 btn-blue-hover' />
                    </Link>
                    <div className='ps-3'>
                        <h5 className='m-0 p-0'>{user?.user?.fullName}</h5>
                        <p className='text-secondary m-0 p-0'>4 posts</p>
                    </div>
                </div>
                <div className='bg-dark'>
                    <img width={"100%"} src="https://pbs.twimg.com/profile_banners/1574992673957552129/1714547050" alt="banner" />
                </div>
                <div className='d-flex justify-content-end p-2'>
                    <button type="button" class="btn btn-outline-light bg-black text-light rounded-pill fw-bold">Edit profile</button>
                </div>
                <div className='div-relative'>
                    <Avatar className=' ms-2' src={user?.user?.profileImg} size="110" round={true} />
                </div>
                <h5>{user?.user?.fullName}</h5>
                <p className='text-secondary'>@{user?.user?.username}</p>
                <div>
                    <p>The Good Smile Company USA Team!▫️Official Hashtags: #goodsmile | #Nendography | #GSCFiguresIRL | #HELLOGoodSmile | #FightGSR</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails