import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const ImgForm = (props) => {

    const initImg = {img: ''}
    const {addImg} = useContext(UserContext)
    const [imgData, setImgData] = useState(initImg)

    const handleChange = (e) => {
        const {name, value} = e.target
        setImgData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addImg(imgData, props.postId)
        setImgData(initImg)
        props.setImgsTrue()
    }

    return(
        <form onSubmit={handleSubmit} className="imgForm">
            <input 
            type="text"
            value={imgData.img}
            name="img"
            placeholder="Add an Image"
            onChange={handleChange}
            />
            <button>Post</button>
        </form>
    )
}

export default ImgForm