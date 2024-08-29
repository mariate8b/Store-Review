/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const setToken = (authToken) => {
        localStorage.setItem("token", authToken);
    };

    const firstNameChangeHandler = (e) => setFirstName(e.target.value);
    const lastNameChangeHandler = (e) => setLastName(e.target.value);
    const emailChangeHandler = (e) => setEmail(e.target.value);
    const passwordChangeHandler = (e) => setPassword(e.target.value);
    const conPasswordChangeHandler = (e) => setConPassword(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !conPassword) {
            setErrorMessage("All fields are required!");
        } else if (password !== conPassword) {
            setErrorMessage("Passwords do not match");
        } else {
            fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(result => {
                const token = result.token;
                console.log(token);
                setToken(token);
                setErrorMessage('');
                setSuccessMessage('You have successfully created your account');
                navigate('/home');
            })
            .catch(console.error);
        }
    };

    return (
        <>
            <form onSubmit={(e) => submitHandler(e)} id="formReg">
                <label>First Name:</label>
                <input type="text" onChange={(e) => firstNameChangeHandler(e)} value={firstName} />
                <br />
                <label>Last Name:</label>
                <input type="text" onChange={(e) => lastNameChangeHandler(e)} value={lastName} />
                <br />
                <label>Email:</label>
                <input type="email" onChange={(e) => emailChangeHandler(e)} value={email} />
                <br />
                <label>Password:</label>
                <input type="password" onChange={(e) => passwordChangeHandler(e)} value={password} />
                <br />
                <label>Confirm Password:</label>
                <input type="password" onChange={(e) => conPasswordChangeHandler(e)} value={conPassword} />
                <br />
                <button type="submit">Submit</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </>
    );
};

export default Register;