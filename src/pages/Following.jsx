import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Tweet from '../components/Tweet'
import { useSelector } from 'react-redux'
import CreatePost from '../components/CreatePost'

const Following = () => {
    const user = useSelector(state => state.userReducer);
    const [allPosts, setAllPosts] = useState([]);
    const [user1, setUser1] = useState(null);
    const id = user?.user?._id;
    // config obj
    const CONFIG_OBJ = {
        headers: {
            "Conten-Type": "aplication/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // gets all posts
    const getAllPosts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/allposts`);

        if (response.status === 200) {
            setAllPosts(response.data.posts);
        }
        else {
            toast.error("error");
        }
    }
    // delete post
    const deletePost = async (postId) => {
        const response = await axios.delete(`${process.env.REACT_APP_API}/api/deletepost/${postId}`, CONFIG_OBJ);
        if (response.status === 200) {
            getAllPosts();
        }
    }
    // fetching user
    async function fetchUser() {
        try {
            if (id) {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/user/${id}`, CONFIG_OBJ);
                setUser1(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    useEffect(() => {
        getAllPosts();
        fetchUser();
    }, [])

    return (
        <div>
            <Layout>
                <div className='d-flex justify-content-around border border-dark'>
                    <Link to='/' className='text-center text-decoration-none text-secondary'>
                        <h3 >For you</h3>
                    </Link>
                    <Link to='/following' className='text-center text-decoration-none text-secondary'>
                        <h3 className='border-bottom border-info'>Following</h3>
                    </Link>
                </div>
                <CreatePost />
                {allPosts.map((post) => {
                    return (
                        <div key={post._id}>
                            {
                                user1?.following?.includes(`${post.author._id}`) ?
                                    (<Tweet
                                        postData={post}
                                        deletePost={deletePost}
                                        getAllPosts={getAllPosts}
                                    />) : ('')
                            }
                        </div>
                    )
                })}
            </Layout>
        </div>
    )
}

export default Following