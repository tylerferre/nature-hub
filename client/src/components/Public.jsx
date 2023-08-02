import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import PostList from './PostList'

const Public = () => {
    
    const {posts} = useContext(UserContext)

    return(
        <div className='public'>
            <h3>All Posts</h3>
            <PostList posts={posts}/>
        </div>
    )
}

export default Public