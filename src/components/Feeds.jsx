import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '../config'
import axios from 'axios'

const Feeds = () => {
  const [allPosts, setAllPosts] = useState([]);


  const CONFIG_OBJ = {
    headers: {
      "Conten-Type": "aplication/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
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
    getAllPosts();
  }, [])
  return (
    <div style={{ width: "50%" }} >
      <CreatePost />
      {allPosts.map((post) => {
        return (
          <div key={post._id}>
            <Tweet
              postData={post}
              deletePost={deletePost}
              getAllPosts={getAllPosts}
            />
          </div>

        )
      })}
    </div>
  )
}

export default Feeds