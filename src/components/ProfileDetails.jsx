import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
import Tweet from './Tweet';
import { SlCalender } from "react-icons/sl";
import { Modal } from 'antd';

const ProfileDetails = () => {
    const user = useSelector(state => state.userReducer);

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState({ preview: '', data: '' })

    const dispatch = useDispatch();
    const [user1, setUser1] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [open, setOpen] = useState(false);
    // Calculate post count for the user
    const postCount = allPosts.filter(post => post.author._id === user1?._id).length;
    const id = user?.user?._id;

    // handling the file select for image
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    // Handle image upload
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);
        const response = axios.post(`${process.env.REACT_APP_API}/uploadFile`, formData);
        return response;
    }
    // form Update function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const imgRes = await handleImgUpload();
            const request = {
                fullName: fullName,
                phone: phone,
                image: `${process.env.REACT_APP_API}/files/${imgRes.data.fileName}`,
                password: password,
                username: username,
                gender: gender
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/update-profile`, request, CONFIG_OBJ);
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setPassword('')
                localStorage.setItem("token", data?.token);
                localStorage.setItem("user", JSON.stringify(data?.updatedUser));
                dispatch({ type: 'LOGIN_SUCCESS', payload: data.updatedUser });
                fetchUser();
                getAllPosts();
                setOpen(false)
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

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
                setFullName(response.data.user.fullName)
                setUsername(response.data.user.username)
                setPhone(response.data.user.phone)
                setGender(response.data.user.gender)
                setEmail(response.data.user.email)

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
                    <button onClick={() => setOpen(true)} type="button" className="btn btn-outline-light bg-black text-light rounded-pill fw-bold">
                        Edit profile
                    </button>
                    <Modal
                        title="Edit Profile"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                    >
                        <div >
                            <form onSubmit={handleUpdate}>
                                <div className='upload-box dropZoneContainer'>
                                    <div className="dropZoneOverlay my-2" >
                                        {image.preview ? (
                                            <img src={image.preview} className='rounded' width="200" />
                                        ) : (
                                            <img src={user1?.profileImg} className='rounded' width='200' />)}
                                        <br />
                                    </div>
                                    <input name="file" type="file" id="drop_zone" className="FileUpload text-black" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                                </div>
                                <div className="form-floating my-3 text-dark">
                                    <input type="text" className="form-control" value={fullName} onChange={(ev) => setFullName(ev.target.value)} placeholder="First fullName" />
                                    <label>Full Name</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="text" className="form-control" value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="Last fullName" />
                                    <label >User Name</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="phone" className="form-control" value={phone} onChange={(ev) => setPhone(ev.target.value)} placeholder="Phone" />
                                    <label >Phone Number</label>
                                </div>

                                <div className="form-floating mb-3 ">
                                    <select className="form-select" value={gender} onChange={(ev) => setGender(ev.target.value)} aria-label="Floating label select example">
                                        <option selected>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <label htmlFor="floatingSelect">Gender</label>
                                </div>
                                <div className="form-floating mb-3 text-dark">
                                    <input type="email" className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" disabled />
                                    <label >Email</label>
                                </div>
                                <div className="form-floating text-dark">
                                    <input type="password" className="form-control" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" />
                                    <label >Password</label>
                                </div>
                                <div className='mt-3 d-grid'>
                                    <button className="btn fw-bold bg-dark text-white btn-outline-light" type='submit'>Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
                <div className='div-relative'>
                    <Avatar className=' ms-2' src={user1?.profileImg} size="110" round={true} />
                </div>
                <h5>{user1?.fullName}</h5>
                <p className='text-secondary'>@{user1?.username}</p>
                <p className='text-secondary mb-0'><SlCalender /> Joined {moment(user1?.createdAt).format("MMMM YYYY")}</p>
                <p className='text-secondary'>
                    <b className='text-light fs-5'>{user1?.following.length}</b> Following <b className='text-light fs-5'>{user1?.followers.length}</b> Followers
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

export default ProfileDetails