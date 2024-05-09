import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Tweet = (props) => {
    const user = useSelector(state => state.userReducer);
    const [commentBox, setCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [allBookmarks, setAllBookmarks] = useState([])
    // config obj
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // get all bookmarks
    const getAllBookmarks = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/allbookmarks`, CONFIG_OBJ);

        if (response.status === 200) {
            setAllBookmarks(response.data.user.bookmarks);
            props.getAllPosts();
        }
        else {
            toast.error("error");
        }
    }

    // Like and Dislike post
    const likeDislikePost = async (postId) => {
        const request = { "postId": postId };
        const response = await axios.put(`${API_BASE_URL}/api/likeordislike`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }
    // bookmark
    const bookmark = async (postId) => {
        const request = { "postId": postId };
        const response = await axios.put(`${API_BASE_URL}/api/bookmark`, request, CONFIG_OBJ);
        if (response.status === 200) {
            getAllBookmarks();
            props.getAllPosts();
        }
    }

    // creating comment
    const submitComment = async (postId) => {
        if (!comment) {
            toast.error("Comment box empty");
        } else {
            setCommentBox(false);
            const request = { "postId": postId, "commentText": comment };
            const response = await axios.put(`${API_BASE_URL}/api/comment`, request, CONFIG_OBJ);
            if (response.status === 200) {
                props.getAllPosts();
            }
        }

    }
    useEffect(() => {
        getAllBookmarks();
    }, [])

    return (
        <div className='border border-dark'>
            <div className='p-4'>
                <Link to={`/user/${props.postData.author._id}`} className='d-flex text-decoration-none' key={props.postData.author._id}>
                    <Avatar src={props.postData.author.profileImg} size="40" round={true} />
                    <h5 className='p-2 pe-0 fw-bold text-white'>{props.postData.author.fullName} </h5>
                    <h5 className='text-secondary p-2'>@{props.postData.author.username} . {moment(props.postData.createdAt).fromNow()}</h5>
                </Link>
                <div>
                    <h5><IoLocationOutline className='mx-2 pb-1' />{props.postData.location}</h5>
                    <p>{props.postData.description}</p>
                    <img className='rounded w-100' src={props.postData.image} alt="post" />
                </div>
                <div className="d-flex justify-content-between fs-5 pt-4">
                    <div className="d-flex ">
                        <FaRegComment className='m-1 btn-green-hover' onClick={() => setCommentBox(true)} />
                        <p>{props.postData.comments.length}</p>
                    </div>
                    <div className="d-flex ">
                        {props.postData.likes.includes(`${user.user._id}`) ? (
                            <FaRegHeart className='m-1 btn-pink-hover text-danger' onClick={() => likeDislikePost(props.postData._id)} />
                        ) : (
                            <FaRegHeart className='m-1 btn-pink-hover' onClick={() => likeDislikePost(props.postData._id)} />
                        )}
                        <p>{props.postData.likes.length}</p>
                    </div>
                    <div className="d-flex ">
                        {allBookmarks.includes(`${props.postData._id}`) ? (
                            <FaRegBookmark className='m-1 btn-blue-hover text-primary' onClick={() => bookmark(props.postData._id)} />
                        ) : (
                            <FaRegBookmark className='m-1 btn-blue-hover' onClick={() => bookmark(props.postData._id)} />
                        )}
                    </div>
                    {user.user._id === props.postData.author._id ? (<div className="d-flex ">
                        <MdOutlineDeleteOutline className='m-1 btn-blue-hover ' onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} />
                    </div>) : ('')}
                </div>

                {commentBox ? <div className='row mb-2'>
                    <div className='border border-dark'>
                        <div className='d-flex p-4'>
                            <Avatar src={user?.user.profileImg} size="40" round={true} />
                            <input onChange={(e) => setComment(e.target.value)} className='bg-black border border-black w-100 mx-2 fs-5 text-white' type="text" placeholder='Post your reply' />
                        </div>
                        <div className='d-flex justify-content-end pe-4 pb-3'>
                            <button className='px-3 py-2 btn btn-info rounded-pill fw-bold' onClick={() => submitComment(props.postData._id)}>Reply</button>
                        </div>
                    </div>
                </div> : ""}
                {props.postData.comments.map((comment) => {
                    return (<div className='pb-2 d-flex' key={comment._id}>
                        <Avatar src={comment.commentedBy.profileImg} size="40" round={true} />
                        <div className='ps-3'>
                            <div className='d-flex' >
                                <h5 className='p-0 m-0'>{comment.commentedBy.fullName}</h5>
                                <p className='text-secondary p-0 m-0'>@{comment.commentedBy.username}</p>
                            </div>
                            <p className='p-1'>{comment.commentText}</p>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Tweet