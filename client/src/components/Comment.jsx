import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Comment = (props) => {

    const {deleteComment, user} = useContext(UserContext)

    return(
        <div className="comment">
           <p><span className="commentName">{props.user.username}: </span>{props.comment}</p>
        {(user._id === props.user._id || user.isAdmin) && <button className="deleteCommentBtn" onClick={()=> deleteComment(props._id)}>X</button>}
            <hr />
        </div>
    )
}

export default Comment