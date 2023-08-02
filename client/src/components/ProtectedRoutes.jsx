import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
    const { token, children, redirect } = props
    return token ? children : <Navigate to={redirect}/>
}

export default ProtectedRoutes