import {useState, useContext} from "react";
import { UserContext } from "../../context/UserProvider";

const LoginForm = () => {

    const initLoginInputs = { email: '', password: '' };
    const [inputs, setInputs] = useState(initLoginInputs);
    const { login, errMsg} = useContext(UserContext);
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

    const handleLogin = (e) => {
        e.preventDefault();

        login(inputs);
        setInputs(initLoginInputs);
    }


    return (
        <>
            <form onSubmit={handleLogin} className='AuthForm'>
                <input
                    type="text"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder='Email'
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

                <button>Login</button>
            </form>
        </>

    )
}

export default LoginForm;