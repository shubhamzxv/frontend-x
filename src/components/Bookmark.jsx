import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Tweet from './Tweet';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Bookmark = () => {
    const user = useSelector(state => state.userReducer);
    const [allBookmarks, setAllBookmarks] = useState([])
    const [allPosts, setAllPosts] = useState([])

    const CONFIG_OBJ = {
        headers: {
            "Conten-Type": "aplication/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllBookmarks = async () => {
        const response = await axios.get(`${API_BASE_URL}/allbookmarks`, CONFIG_OBJ);

        if (response.status === 200) {
            setAllBookmarks(response.data.user.bookmarks);
        }
        else {
            toast.error("error");
        }
    }
    const getAllPosts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`);

        if (response.status === 200) {
            setAllPosts(response.data.posts);
        }
        else {
            toast.error("error");
        }
    }
    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
        if (response.status === 200) {
            getAllPosts();
        }
    }

    useEffect(() => {
        getAllBookmarks();
        getAllPosts();
    }, [])


    return (
        <div style={{ width: "50%" }} className='border border-dark'>
            <div className='mb-0 p-2'>
                <div className='d-flex'>
                    <Link to="/" className='text-decoration-none text-white'>
                        <IoMdArrowBack className='fs-3 btn-blue-hover' />
                    </Link>
                    <div className='ps-3'>
                        <h5 className='m-0 p-0'>{user?.user?.fullName}</h5>
                        <p className='text-secondary m-0 p-0'>{allBookmarks.length} posts</p>
                    </div>
                </div>
                {/* <Tweet/> */}
                {allPosts.map((post) => {

                    return (
                        <div key={post._id}>{allBookmarks.includes(`${post._id}`) ? (
                            <Tweet
                                postData={post}
                                deletePost={deletePost}
                                getAllPosts={getAllPosts}
                            />
                        ) : ('')}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Bookmark