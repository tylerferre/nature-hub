import React, { useContext } from "react";
import { Link} from "react-router-dom";

const Posts = (props) => {

    const date = props.createdAt.split('').splice(0, 10).join('')

    return(
        <div className="post">
            <Link className="postLink" to={`/posts/${props._id}`}>
                <div className="postN-D">
                    <h3>{props.user.username}</h3>
                    <span>{date}</span>
                </div>
                
                <div className="postLinkInfo">
                    <img src={props.imgUrl}/>
                    <h4>{props.title}</h4>
                </div>
            </Link>
        </div>
    )
}

export default Posts