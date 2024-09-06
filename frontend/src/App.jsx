import {  Routes, Route} from 'react-router-dom';
import {useState} from "react"
import Home from './components/Home';
import NavBar from "./components/NavBar";
import Register from './components/Register';
import Login from './components/Login';
import './App.css'

function App() {
  const [token,setToken] = useState(null);

  return (
   <div>
    <NavBar token={token}/>
  
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register setToken={setToken}/>}/>
    </Routes>
    </div>
  )
}

export default App
