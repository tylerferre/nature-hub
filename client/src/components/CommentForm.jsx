import React, {useState, useContext} from "react";
import { UserContext } from "../context/UserProvider";

const CommentForm = (props) => {
    
    const initComment = {comment: ''}
    const {addComment} = useContext(UserContext)
    const [commentData, setCommentData] = useState(initComment)

    const handleChange = (e) => {
        const {name, value } = e.target
        setCommentData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addComment(commentData, props.postId)
        setCommentData(initComment)
        props.setCommentsTrue()
    }

    return(
        <form onSubmit={handleSubmit} className='commentForm'>
            <input 
            type="text" 
            name='comment'
            value={commentData.comment}
            placeholder='Add a Comment'
            onChange={handleChange}
            />
            <button>Post</button>
        </form>
    )
}

export default CommentForm