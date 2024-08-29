import {  Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import NavBar from "./components/NavBar";
import Register from './components/Register';
import Login from './components/Login';
import './App.css'

function App() {
  

  return (
   <div>
    <NavBar/>
  
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </div>
  )
}

export default App
