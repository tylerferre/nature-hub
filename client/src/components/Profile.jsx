import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import PostList from "./PostList";

const Profile = () => {
    const navigate =  useNavigate()

    const {
        user: {username, profilePic, _id, isAdmin},
        posts,
        updatePfp
    } = useContext(UserContext)
    const inintInputs = {profilePic: ''}
    const [pfp, setPfp] = useState(false)
    const [inputs, setInputs] = useState(inintInputs)
    const togglePfp = () => {
        setPfp(prev => !prev)
    }
    const handlechange = (e) => {
        const {name, value} = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updatePfp(_id, inputs)
        setInputs(inintInputs)
        setPfp(false)
    }

    return(
        <div className="profile">
            <p onClick={togglePfp}><span className="material-symbols-outlined">edit</span></p>
            {!pfp ? <div className="pfpDiv">
                <img className="profilePic" src={profilePic} />
            </div> 
            :
            <form onSubmit={handleSubmit} className="pfpForm">
                <h5 style={{paddingBottom: '5px'}}>Update Profile Picture:</h5>
                <input 
                type="text"
                value={pfp.profilePic}
                name="profilePic"
                onChange={handlechange}
                placeholder="Image Url"
                />
                <button>Submit</button>
            </form>
            }

            {isAdmin? <h1 style={{textDecoration: 'none'}}><span style={{textDecoration: 'underline'}}>{username}</span>
            <span style={{fontSize: '14px', color: 'grey'}}> admin</span>
            </h1> 
            :
            <h1>{username}</h1>}
            <button className="makePostBtn" onClick={()=> navigate('/post')}>Make a post!</button>
            <h3>Your Posts</h3>
            <PostList posts={posts}/>
        </div>
    )
}

export default Profile