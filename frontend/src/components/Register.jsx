import React, { useState } from 'react';
import {useRegisterMutation} from '../redux/api'

const Register = (setToken) => {
    const initialForm = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        conPassword: ""
    };

    const [form, updateForm] = useState(initialForm);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [register] = useRegisterMutation();

    const handleChange = () => {
        const { name, value } = e.target;
        updateForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Example validation (simple check)
        if (form.username === "" || form.password === "") {
            setErrorMessage("Passwords do not match");
            return;
        }

        const {data, error} = register(form);

        

    
        setErrorMessage("");
        // Here you would typically handle form submission, e.g., send data to a server
        setSuccessMessage("Registration successful!");

        setToken(data.token);
    };

    const { username, password, first_name, last_name, email, conPassword } = form;

    return (
        <>
            <h2>Register Form</h2>
            <form onSubmit={submitHandler} id="formReg">
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={username}
                />
                <br />
                <label>First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={first_name}
                />
                <br />
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={last_name}
                />
                <br />
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
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="conPassword"
                    onChange={handleChange}
                    value={conPassword}
                />
                <br />
                <button type="submit">Submit</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </>
    );
};

export default Register;
