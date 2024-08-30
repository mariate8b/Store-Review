import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault(); // Stop page reload

        if (!email || !password) {
            setErrorMessage("All fields are required!");
            setSuccessMessage('');
        } else {
            setErrorMessage('');
            setSuccessMessage("You've successfully logged in");
            navigate('/home');
            console.log(email);
            console.log(password);
        }
    };

    return (
        <>
            <form onSubmit={submitHandler} id="formReg">
                <h1>Sign In</h1>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                />
                <br />
                <button type="submit">Submit</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
            <div>
                <h5><Link to="/register">Sign Up</Link></h5>
            </div>
        </>
    );
}

export default Login;
