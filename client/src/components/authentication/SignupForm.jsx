import {useState, useContext} from "react";
import { UserContext } from "../../context/UserProvider";

const SignupForm = () => {

    const initSignupInputs = { firstname: '', lastname: '', email: '', username: '', password: '' };
    const [inputs, setInputs] = useState(initSignupInputs);
    const { signup, errMsg} = useContext(UserContext);
    const [password, setPassword] = useState(false);

    const togglePassword = () => {
        setPassword(prevState => !prevState);
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSignup = (e) => {
        e.preventDefault();

        signup(inputs);
        setInputs(initSignupInputs);
    }


    return (
        <>
            <form onSubmit={handleSignup} className='authForm'>
                <input
                    type="text"
                    name="firstname"
                    value={inputs.firstname}
                    onChange={handleChange}
                    placeholder='First Name'
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    value={inputs.lastname}
                    onChange={handleChange}
                    placeholder='Last Name'
                    required
                />
                <input
                    type="text"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    placeholder='Username'
                    required
                />
                <div className='passDiv'>
                    <input
                        type={!password ? 'password' : 'text'}
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                    />
                    <span onClick={togglePassword} className='passToggle' >{!password ? <span style={{ marginTop: '6px' }} className="material-symbols-rounded">visibility</span> : <span style={{ marginTop: '6px' }} className="material-symbols-rounded">visibility_off</span>}</span>
                </div>
                <p style={{ color: 'red' }}>{errMsg}</p>
                <button>Sign Up</button>
            </form>
        </>

    )
}

export default SignupForm;