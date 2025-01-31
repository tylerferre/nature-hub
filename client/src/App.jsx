import { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Auth from './components/authentication/Auth';
import Profile from './components/Profile';
import Public from './components/Public';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';
import { UserContext } from './context/UserProvider';
import ProtectedRoutes from './components/routes/ProtectedRoutes';
import MobileNav from './components/navbar/MobileNav';
import Settings from './components/settings';

function App() {
  const {token, logout, settings} = useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const nav = screenWidth > 950 ? <Navbar logout={logout}/> : <MobileNav logout={logout}/>

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {token && nav}
      <div className={token ? 'App' : ''}>

        {settings && <Settings/>}
        
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
    </div>
  )
}

export default App;
