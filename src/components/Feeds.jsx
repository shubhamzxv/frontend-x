import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import toast from 'react-hot-toast'
import { API_BASE_URL } from '../config'
import axios from 'axios'

const Feeds = () => {
  // State to store all posts
  const [allPosts, setAllPosts] = useState([]);

  // Configuration object for API requests
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json", // Corrected "Content-Type" spelling
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  // Function to fetch all posts from the server
  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/allposts`);

      if (response.status === 200) {
        setAllPosts(response.data.posts);
      } else {
        toast.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Error fetching posts");
    }
  }

  // Function to delete a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/deletepost/${postId}`, CONFIG_OBJ);
      if (response.status === 200) {
        getAllPosts();
      } else {
        toast.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  }

  // Fetch all posts when component mounts
  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <div>
      {/* Component to create a new post */}
      <CreatePost />
      {/* Displaying all posts */}
      {allPosts.map((post) => {
        return (
          <div key={post._id}>
            {/* Component to display a single post */}
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
