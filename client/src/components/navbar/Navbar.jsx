import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'

const Navbar = (props) => {
    const navigate = useNavigate()
    const { getUserPosts, getPublicPosts, Settings } = useContext(UserContext)
    return (
        <div className='navbar'>
            <h1 className='logo' style={{fontSize: "30px"}}>Nature Hub<span className="material-symbols-outlined" style={{fontSize: "30px"}}>forest</span></h1>
            {/* <button onClick={()=> navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button> */}
            <button onClick={() => navigate('/post')}><span className="material-symbols-outlined">add_circle</span></button>
            <Link to='/profile'><span><span className="material-symbols-outlined">person</span></span></Link>
            <Link to='/public'><span><span className="material-symbols-outlined">group</span></span></Link>
            <button onClick={Settings}><span className="material-symbols-outlined">settings</span></button>
            {/* <button onClick={props.logout}><span className="material-symbols-outlined">logout</span></button> */}


        </div>
    )
}

export default Navbar