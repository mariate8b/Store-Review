
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login(){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const navigate = useNavigate();
    const [value, setValue]= useState([])

   
    const emailChangeHandler = (e) =>{
        setEmail(e.target.value) //inputText = e.target.value
    }
    const passwordChangeHandler = (e) =>{
        setPassword(e.target.value) //inputText = e.
        
    }

    
    const submitHandler = (e) => {
        e.preventDefault() // Stop Page Re-load...
        if ( !email || !password) {
            setErrorMessage("All fields are required!");
           
        } else {
            
            setErrorMessage('')
            setsuccessMessage("You've succesfully logged in")
            navigate('/home');
        
            console.log(email);
            console.log(password);
        };
    }
    return (
        <>
      
            
      <form onSubmit={(e) => submitHandler(e)} id="formReg">
      <h1>Sign In</h1>
        <label>Email:</label>
        <input type="email" onChange={(e) => emailChangeHandler(e)} value={email} />
        <br/>
        <label>Password:</label>
        <input type="password" onChange={(e) => passwordChangeHandler(e)} value={password} />
        <div>

            <button type="submit"> Submit </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
        </form>
        <div>
        <h5><Link to={`/register`}>Sign Up</Link></h5>
        </div>
        </>
    )
}

export default Login