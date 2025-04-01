import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import PostList from './PostList'

const Public = () => {
    
    const { posts, getPublicPosts } = useContext(UserContext)

    useEffect(() => {
        getPublicPosts();
    }, []);

    return(
        <div className='public'>
            <h3>All Posts</h3>
            <PostList posts={posts}/>
        </div>
    )
}

export default Public