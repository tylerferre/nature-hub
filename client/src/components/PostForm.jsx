import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const initInputs = {
    title: '',
    description: '',
    imgFile: {}
}

const PostForm = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState(initInputs)
    const [fileData, setFileData] = useState()
    const { newPost, getUserPosts } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
            setFileData(e.target.files);
            setInputs(prev => ({
                ...prev,
                imgFile: e.target.files 
            }))
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        // newPost(inputs)
        // setInputs(initInputs)
        // navigate('/profile')
        // getUserPosts()
        console.log(inputs)
    }



    return (
        <div className='postFormDiv'>
            <div className='postPreview'>
                {fileData ? <img src={URL.createObjectURL(new Blob(fileData))} /> : <div className='imgPreview'></div>}
                {inputs.title ? <h2>{inputs.title}</h2> : <h2>Title</h2>}
                {inputs.description ? <p>{inputs.description}</p> : <p>Description</p>}
            </div>

            <form className='postForm' onSubmit={handleSubmit}>
                <input
                    className='input-text'
                    type="text"
                    name='title'
                    value={inputs.title}
                    onChange={handleChange}
                    placeholder='Title'
                    required
                />
                <input
                    className='input-text'
                    type="text"
                    name='description'
                    value={inputs.description}
                    onChange={handleChange}
                    placeholder='Description'
                    required
                />
                <input
                    type="file"
                    name='file'
                    className='file-input'
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    required
                />

                <button>Post</button>
            </form>
        </div>
    )
}

export default PostForm