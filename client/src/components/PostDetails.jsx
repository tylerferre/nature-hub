import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import ImgForm from "./ImgForm";
import ImgList from "./ImgList";

const PostDetails = () => {
    const {
        posts, 
        user, 
        deletePost, 
        like, 
        unLike,
        comments,
        imgs
    } = useContext(UserContext)
    const navigate = useNavigate()
    let {postId} = useParams()
    const foundPost = posts?.find(item => item._id === postId)

    const [toggleComments, setToggleComments] = useState(false)
    const [toggleImgs, setToggleImgs] = useState(false)
    const [toggleDlete, setToggleDelete] = useState(false)

    const setCommentsTrue = () => {
        setToggleComments(true)
    }
    const setImgsTrue = () => {
        setToggleImgs(true)
    }
    const date = foundPost.createdAt.split('').splice(0, 10).join('')
    const likesMap = foundPost.likes?.map(item => item === user._id)
    const likesFilter = likesMap?.filter(item => item === true)

    const likes = () => {
        if(likesFilter.length === 1){
            unLike(foundPost._id)
        }else{
            like(foundPost._id)
        }
    }

    const filteredComments = comments?.filter(item => item.post === foundPost._id)
    const filteredImgs = imgs.filter(item => item.post === foundPost._id)

    return(
        <>
            {!toggleDlete ? <div className="postDetails">
                <div className="postND">
                    <h3>{foundPost.user.username}</h3>
                    <p>{date}</p> 
                </div>
                
                <div className="postPic">
                    <img src={foundPost.imgUrl}/>
                </div>

                <div className="postInfo">
                    <h1>{foundPost.title}</h1>
                    <h4>{foundPost.description}</h4>

                    <div className="likeDiv">
                        <button className="likeBtn" onClick={likes}>
                        {likesFilter.length === 1 ? <span style={{color: 'green', fontSize: '25px'}} className="material-symbols-outlined">thumb_up</span> 
                        :
                        <span style={{fontSize: '25'}} className="material-symbols-outlined">thumb_up</span>}</button>
                        <span>{foundPost.likes.length}</span>
                    </div>
                    
                    <div className="commentImgBtns">
                        <p className="commentBtn" style={{cursor: 'pointer', width: 'fit-content'}}
                        onClick={()=> (
                            setToggleComments(prev => !prev),
                            setToggleImgs(false),
                            window.scrollTo(0, 1000)
                            )}>
                            Comments
                        </p>
                        <p className="imgBtn" style={{cursor: 'pointer', width: 'fit-content'}}
                        onClick={()=> (
                            setToggleImgs(prev => !prev),
                            setToggleComments(false),
                            window.scrollTo(0, 1000)
                            )}>
                            Images
                        </p>  
                    </div>
                </div>
                
                {/* Comments and Imgs */}
                {toggleComments && <div className="commentsDiv">
                    <CommentForm postId={foundPost._id} setCommentsTrue={setCommentsTrue}/>
                    <CommentList comments={filteredComments}/>
                </div>}

                {toggleImgs && <div className="imgsDiv">
                    <ImgForm postId={foundPost._id} setImgsTrue={setImgsTrue} />
                    <ImgList imgs={filteredImgs}/>
                </div>}

            {/* Delete logic */}
            {(user.username === foundPost.user.username || user.isAdmin) &&
                <button className="deleteBtn" onClick={()=> setToggleDelete(true)}>delete post</button>}
            </div>
            :
            <div style={{paddingTop: '250px'}}>
                <div className="deleteForm">
                    <div className="deleteFormInfo">
                        <h2>Are you sure you want to delete this post?</h2>
                    </div>
                    <div className="deleteFormBtns">
                        <button onClick={()=> setToggleDelete(false)}>Back</button>
                        <button onClick={()=>{
                        navigate(-1)
                        setToggleDelete(false)
                        deletePost(foundPost._id)
                        }}style={{backgroundColor: '#ca0000'}}>Delete</button>
                    </div>
                </div> 
            </div>
            
            }
        </>
    )
}

export default PostDetails