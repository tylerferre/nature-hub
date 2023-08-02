import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Img = (props) => {

    const {user, deleteImg} = useContext(UserContext)

    return(
        <div className="img">
            <div className="imgInfo">
                <p className="imgName">{props.user.username}:</p>
                {(user._id === props.user._id || user.isAdmin) && <button className="deleteImgButton" onClick={()=> deleteImg(props._id)}>X</button>}
            </div>
            <img src={props.img}/>
        </div>
    )
}

export default Img