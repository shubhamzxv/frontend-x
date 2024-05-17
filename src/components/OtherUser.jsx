import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Tweet from './Tweet';
import moment from 'moment';
import { SlCalender } from "react-icons/sl";

const OtherUser = () => {
  const { id } = useParams();
  const user = useSelector(state => state.userReducer);
  const [user1, setUser1] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Calculate post count for the user
  const postCount = allPosts.filter(post => post.author._id === user1?._id).length;

  // Configuration object for API requests
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  // Function to fetch user details
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

  // Function to fetch all posts
  const getAllPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/allposts`);

    if (response.status === 200) {
      setAllPosts(response.data.posts);
    }
    else {
      toast.error("error");
    }
  }

  // Function to delete a post
  const deletePost = async (postId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/api/deletepost/${postId}`, CONFIG_OBJ);
    if (response.status === 200) {
      getAllPosts();
    }
  }

  // Function to handle follow/unfollow action
  const followAndUnfollowHandler = async () => {
    if (user1?.followers?.includes(user?.user?._id)) {
      // unfollow
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/unfollow/${id}`, { id: user?.user?._id }, CONFIG_OBJ);
        fetchUser();
        getAllPosts();
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }

    } else {
      // follow
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/follow/${id}`, { id: user?.user?._id }, CONFIG_OBJ);
        fetchUser();
        getAllPosts();
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchUser();
    getAllPosts();
  }, [id]);

  return (
    <div className='border border-dark'>
      <div className='mb-0 p-2'>
        <div className='d-flex'>
          <Link to="/" className='text-decoration-none text-white'>
            <IoMdArrowBack className='fs-3 btn-blue-hover' />
          </Link>
          <div className='ps-3'>
            <h5 className='m-0 p-0'>{user1?.fullName}</h5>
            <p className='text-secondary m-0 p-0'>{postCount} posts</p>
          </div>
        </div>
        <div className='bg-dark' style={{ height: 200 }} >
        </div>
        <div className='d-flex justify-content-end p-2'>
          {user1?.followers?.includes(user?.user?._id) ? (
            <button onClick={followAndUnfollowHandler} type="button" className="btn btn-outline-light bg-black text-light rounded-pill fw-bold">Following</button>
          ) : (
            <button onClick={followAndUnfollowHandler} type="button" className="btn btn-outline-light bg-light text-black rounded-pill fw-bold">Follow</button>
          )}
        </div>
        <div className='div-relative'>
          <Avatar className=' ms-2' src={user1?.profileImg} size="110" round={true} />
        </div>
        <h5>{user1?.fullName}</h5>
        <p className='text-secondary'>@{user1?.username}</p>
        <p className='text-secondary mb-0'><SlCalender /> Joined {moment(user1?.createdAt).format("MMMM YYYY")}</p>
        <p className='text-secondary'>
          <b className='text-light fs-5'>{user1?.followers?.length}</b> Following <b className='text-light fs-5'>{user1?.following.length}</b> Followers
        </p>
        <div>
          <p>The Good Smile Company USA Team! Official Hashtags: #goodsmile | #Nendography | #GSCFiguresIRL | #HELLOGoodSmile | #FightGSR</p>
        </div>
      </div>
      <div className='ps-3 border border-dark mt-3'>
        <h5 >Posts <span className='text-secondary'>{postCount}</span></h5>
      </div>
      {allPosts.map((post) => {

        return (
          <div key={post._id}>{user1?._id === post.author._id ? (
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
  )
}

export default OtherUser