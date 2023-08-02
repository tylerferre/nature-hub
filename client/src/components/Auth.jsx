import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import AuthForm from './AuthForm'

const initInputs = {username: '', password: ''}

const Auth = () => {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    const {login, signup, errMsg, resetAuthErr} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSignup = (e) => {
        e.preventDefault()

        signup(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        login(inputs)
    }

    const toggleForm = () => {
        setToggle(prevState => !prevState)
        resetAuthErr()
    }

    return(
        <div className='auth'>
            <h1 className='logo'>Nature Hub<span className="material-symbols-outlined">forest</span></h1>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText='Sign up'
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
                </>
                :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Not a member?</p>
                </>
            }
        </div>
    )
}

export default Auth