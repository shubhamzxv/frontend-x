import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar'
import axios from 'axios';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';

const RightSidebar = () => {
    const [otherUsers, setOtherUsers] = useState([])

    const CONFIG_OBJ = {
        headers: {
            "Conten-Type": "aplication/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getOtherUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/otherusers`, CONFIG_OBJ);

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
        <div style={{ width: "22%" }}>
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
                                <h5 className='p-0 m-0'>{user.fullName}</h5>
                                <p className='text-secondary p-0 m-0'>@{user.username}</p>
                            </div>
                            <div>
                                <button className='px-3 py-2 btn btn-light rounded-pill fw-bold'>Follow</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RightSidebar