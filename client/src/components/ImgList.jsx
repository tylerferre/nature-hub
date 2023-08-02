import React from "react";
import Img from "./Img";

const ImgList = (props) => {

    return(
        <div className="imgList">
            {props.imgs.map((img, index) => <Img {...img} key={index}/>)}
        </div>
    )
}

export default ImgList