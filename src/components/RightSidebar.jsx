import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
    const [otherUsers, setOtherUsers] = useState([])
    // config obj   
    const CONFIG_OBJ = {
        headers: {
            "Conten-Type": "aplication/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // gets the all other users
    const getOtherUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/otherusers`, CONFIG_OBJ);

        if (response.status === 200) {
            setOtherUsers(response.data.otherUsers);
        }
        else {
            toast.error("error");
        }
    }
    useEffect(() => {
        getOtherUsers();
    }, [])

    return (
        <div style={{ width: "25%" }} className='d-none-sm'>
            <div className='d-flex bg-dark rounded-pill'>
                <FaSearch className='m-2' />
                <input className='w-100 bg-dark border border-dark rounded-pill text-white' type="text" placeholder='Search' />
            </div>
            <div className='mt-4 border border-dark p-2 rounded bg-dark'>
                <div className='mb-3'>
                    <h3>Who to follow</h3>
                </div>
                {/* follow */}
                {otherUsers.map((user) => {
                    return (
                        <div className='d-flex my-2' key={user._id}>
                            <div>
                                <Avatar src={user.profileImg} size="40" round={true} />
                            </div>
                            <div className='w-100 ps-2' >
                                <h6 className='p-0 m-0'>{user.fullName}</h6>
                                <p className='text-secondary p-0 m-0'>@{user.username}</p>
                            </div>
                            <Link to={`/user/${user?._id}`}>
                                <button className='px-3 py-2 btn btn-light rounded-pill fw-bold'>Profile</button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RightSidebar