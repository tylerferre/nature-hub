import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import PostList from "./PostList";

const Profile = () => {
    const navigate = useNavigate();

    const {
        user: { username, profilePic, _id, isAdmin },
        posts,
        updatePfp
    } = useContext(UserContext);
    // const inintInputs = { profilePic: '' };
    // const [pfp, setPfp] = useState(false);
    // const [inputs, setInputs] = useState(inintInputs);
    // const togglePfp = () => {
    //     setPfp(prev => !prev)
    // };

    // const handlechange = (e) => {
    //     const { name, value } = e.target
    //     setInputs(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     updatePfp(_id, inputs);
    //     setInputs(inintInputs);
    //     setPfp(false);
    // };

    return (
        <div className="profile">
            <div className="profileInfo">

                <div className="pfpDiv">
                    <img className="profilePic" src={profilePic} />
                </div>

                <div className="user-info-div">
                    {isAdmin ?
                        <h1 style={{ textDecoration: 'none' }}><span style={{ textDecoration: 'underline' }}>{username}</span>
                            <span style={{ fontSize: '14px', color: 'grey' }}> admin</span>
                        </h1>
                        :
                        <h1>{username}</h1>}
                </div>

            </div>

            <button className="makePostBtn" onClick={() => navigate('/post')}>Add post!</button>

            <PostList posts={posts} />
        </div>
    )
}

export default Profile;