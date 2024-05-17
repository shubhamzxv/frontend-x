import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { CiImageOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { IoLocationOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';

const CreatePost = () => {
    const user = useSelector(state => state.userReducer);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState({ preview: '', data: '' })

    // Configuration object for API requests
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json", // Corrected "Content-Type" spelling
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // Function to handle file selection
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    // Function to upload image
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${process.env.REACT_APP_API}/uploadFile`, formData);

        return response;
    }

    // creating post
    const addPost = async () => {
        if (caption === '') {
            toast.error("please add caption"); // Display error message using toast
        }
        else {
            const imgRes = await handleImgUpload();
            //add validation rule for caption and location
            const request = { description: caption, location: location, image: `${process.env.REACT_APP_API}/files/${imgRes.data.fileName}` }

            //write api call to create post
            const postResponse = await axios.post(`${process.env.REACT_APP_API}/api/createpost`, request, CONFIG_OBJ)

            if (postResponse.status === 201) {
                toast.success("created");
                window.location.reload();
            } else {
                toast.error("Some error occurred while creating post");
            }
        }
    }

    return (
        <div className='w-100 border border-dark' >
            <div className='border border-dark'>
                <div className='d-flex p-4'>
                    <Avatar src={user?.user.profileImg} size="40" round={true} />
                    <input onChange={(ev) => setCaption(ev.target.value)} className='bg-black border border-black w-100 mx-2 fs-5 text-white' type="text" placeholder='What is happening?!' />
                </div>
                <div className="col px-4">
                    <div className='upload-box dropZoneContainer'>
                        <div className="dropZoneOverlay ">
                            {image.preview && <img src={image.preview} className='rounded' width='100%' alt='profile-pic' />}
                            <br /></div>
                        <CiImageOn className='fs-2 my-1 btn-blue-hover' />
                        <input name="file" type="file" id="drop_zone" className="FileUpload text-black" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                    </div>
                </div>

                <div className='d-flex justify-content-between p-4'>
                    <IoLocationOutline className='fs-2 my-1 btn-blue-hover' />
                    <input className='ps-1 bg-black border border-black w-100 mx-2 fs-5 text-white' onChange={(ev) => setLocation(ev.target.value)} type="text" placeholder='Location' />
                    <button className='px-3 py-2 btn btn-info rounded-pill fw-bold' onClick={() => addPost()}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost