import React from 'react';
import Posts from './Posts';

const PostList = (props) => {
    return(
        <div className='postList'>
            {props.posts.map((post, index) => <Posts {...post} key={index}/>)}
        </div>
    )
}

export default PostList;