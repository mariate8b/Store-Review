import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout'; 
import DestinationsList from './components/DestinationsList';



import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <div>
      <NavBar token={token} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/destinations" element={<DestinationsList />} />
       
      </Routes>
    </div>
  );
}

export default App;

