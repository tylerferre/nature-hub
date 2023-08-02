import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const initInputs = {
        title: '',
        description: '',
        imgUrl: ''
    }

const PostForm = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState(initInputs)
    const {newPost, getUserPosts} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        newPost(inputs)
        setInputs(initInputs)
        navigate('/profile')
        getUserPosts()
    }

    return(
        <div className='postFormDiv'>
            <div className='postPreview'>
                {inputs.imgUrl ? <img src={inputs.imgUrl}/> : <div className='imgPreview'></div>}
                {inputs.title ? <h2>{inputs.title}</h2> : <h2>Title</h2>}
                {inputs.description ? <p>{inputs.description}</p> : <p>Description</p>}
            </div>
            
            <form className='postForm' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='title'
                    value={inputs.title}
                    onChange={handleChange}
                    placeholder='Title'
                    required
                />
                <input 
                    type="text" 
                    name='description'
                    value={inputs.description}
                    onChange={handleChange}
                    placeholder='Description'
                    required
                />
                <input 
                    type="text" 
                    name='imgUrl'
                    value={inputs.imgUrl}
                    onChange={handleChange}
                    placeholder='Image'
                    required
                />
                <button>Post</button>
            </form>
        </div>
    )
}

export default PostForm