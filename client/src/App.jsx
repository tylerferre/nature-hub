import { useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'
import PostForm from './components/PostForm'
import PostDetails from './components/PostDetails'
import { UserContext } from './context/UserProvider'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const {token, logout} = useContext(UserContext)

  return (
    <div className='App'>
      {token && <Navbar logout={logout}/>}
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/profile'/> : <Auth/>}
        />
        <Route 
          path='/profile'
          element={<ProtectedRoutes token={token} redirect='/'>
            <Profile/>
          </ProtectedRoutes>}
        />
        <Route 
          path='/public'
          element={<ProtectedRoutes token={token} redirect='/'>
            <Public/>
          </ProtectedRoutes>}
        />
        <Route
          path='/post'
          element={<ProtectedRoutes token={token} redirect='/'>
            <PostForm/>
          </ProtectedRoutes>}
        />
        <Route
          path='/posts/:postId'
          element={<ProtectedRoutes token={token} redirect='/'>
            <PostDetails/>
          </ProtectedRoutes>}
        />
      </Routes>
    </div>
  )
}

export default App
