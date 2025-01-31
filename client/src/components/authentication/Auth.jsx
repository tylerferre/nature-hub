import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Auth = () => {

    const [toggle, setToggle] = useState(true);
    const { login, signup, errMsg, resetAuthErr } = useContext(UserContext);
    const [password, setPassword] = useState(false);

    const toggleForm = () => {
        setToggle(prevState => !prevState);
        resetAuthErr();
    };

    return (
        <div className='auth'>
            <h1 className='logo'>Nature Hub<span className="material-symbols-outlined">forest</span></h1>
                {!toggle ? <SignupForm /> : <LoginForm />}
            <p onClick={toggleForm}>{toggle ? 'Not a Member?' : 'Already a Member?'}</p>
        </div>
    );

    // return(
    //     <div className='auth'>
    //         <h1 className='logo'>Nature Hub<span className="material-symbols-outlined">forest</span></h1>
    //         {!toggle ?
    //             <>
    //                 <AuthForm
    //                     handleChange={handleChange}
    //                     handleSubmit={handleSignup}
    //                     inputs={inputs}
    //                     btnText='Sign up'
    //                     errMsg={errMsg}
    //                 />
    //                 <p onClick={toggleForm}>Already a member?</p>
    //             </>
    //             :
    //             <>
    //                 <AuthForm
    //                     handleChange={handleChange}
    //                     handleSubmit={handleLogin}
    //                     inputs={inputs}
    //                     btnText='Login'
    //                     errMsg={errMsg}
    //                 />
    //                 <p onClick={toggleForm}>Not a member?</p>
    //             </>
    //         }
    //     </div>
    // )
}

export default Auth;