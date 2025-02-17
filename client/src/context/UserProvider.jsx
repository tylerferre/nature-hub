import React, { useState, createContext, useEffect } from "react";
import axios from 'axios'



const UserContext = createContext()
const userAxios = axios.create()


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token : localStorage.getItem('token') || '',
        posts: []
    }
    const [userState, setUserState] = useState(initState);
    const [comments, setComments] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [settings, setSettings] = useState(false);

    // Auth

    const signup = (credentials) => {
        axios.post('/proxy/auth/signup', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = (credentials) => {
        axios.post('/proxy/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserPosts()
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            posts: [],
            errMsg: ''
        })
    }

    const updatePfp = (userId, pfp) => {
        userAxios.put(`/proxy/auth/update/${userId}`, pfp)
        .then(res => {
            console.log(res)
            setUserState(prevState => ({
                ...prevState,
                user: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // Auth Errors

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    // Posts

    const getUserPosts = () => {
        userAxios.get('/proxy/api/post/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                posts: res.data
            }))
            getComments()
            getImgs()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getPublicPosts = () => {
        userAxios.get('/proxy/api/post')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                posts: res.data
            }))
            getComments()
            getImgs()
        })
    }

    const newPost = (newPost) => {
        userAxios.post('/proxy/api/post', newPost)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                posts: [...prevState.posts, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deletePost = (postId) => {
        userAxios.delete(`/proxy/api/post/${postId}`)
        .then(res => setUserState(prevState => (
            {...prevState, posts: prevState.posts.filter(post => post._id !== postId)}
        )))
        .catch(err => console.log(err.response.data.errMsg))
    }

    // Likes

    const like = (postId) => {
        userAxios.put(`/proxy/api/post/like/${postId}`)
        .then(res => {
            setUserState(prevState => (
                {...prevState, posts: prevState.posts.map(posts =>
                    postId !== posts._id ? posts : res.data)}
            ))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const unLike = (postId) => {
        userAxios.put(`/proxy/api/post/unLike/${postId}`)
        .then(res => {
            setUserState(prevState => (
                {...prevState, posts: prevState.posts.map(posts =>
                    postId !== posts._id ? posts : res.data)}
            ))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // Comments
    
    const getComments = () => {
        userAxios.get('/proxy/api/comment')
        .then(res => setComments(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addComment = (newComment, postId) => {
        userAxios.post(`/proxy/api/comment/${postId}`, newComment)
        .then(res => {
            setComments(prevState => ([
                ...prevState,
                res.data
            ]))
            getComments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteComment = (commentId) => {
        userAxios.delete(`/proxy/api/comment/${commentId}`)
        .then(res => setComments(prevState => (
            prevState.filter(item => item._id !== commentId))))
        .catch(err => console.log(err.response.data.errMsg))
    }

    // Imgs 

    const getImgs = () => {
        userAxios.get('/proxy/api/img')
        .then(res => setImgs(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addImg = (newImg, postId) => {
        userAxios.post(`/proxy/api/img/${postId}`, newImg)
        .then(res => {
            setImgs(prevState => ([
            ...prevState,
            res.data
        ]))
        getImgs()
    })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteImg = (imgId) => {
        userAxios.delete(`/proxy/api/img/${imgId}`)
        .then(res => setImgs(prevState => (
            prevState.filter(item => item._id !== imgId))))
        .catch(err => console.log(err.response.data.errMsg))
    }

    const Settings = () => {
        setSettings(prevState => !prevState);
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                comments,
                imgs,
                setUserState,
                signup,
                login,
                logout,
                updatePfp,
                handleAuthErr,
                resetAuthErr,
                getUserPosts,
                getPublicPosts,
                newPost,
                deletePost,
                like,
                unLike,
                addComment,
                deleteComment,
                getImgs,
                addImg,
                deleteImg,
                Settings,
                settings
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}