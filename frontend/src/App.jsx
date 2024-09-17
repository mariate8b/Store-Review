import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout'; 
import DestinationsList from './components/DestinationsList';
import MyAccount from './components/MyAccount';
import Settings from './components/Settings'; // Ensure these components are created
import MyPosts from './components/MyPosts';
import SavedReviews from './components/SavedReviews';
import Chats from './components/Chats';
import DropIt from './components/DropIt';
import SearchBar from './components/SeachBar';



import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <div>
      <NavBar token={token} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/destinationslist" element={<DestinationsList />} />
        <Route path="/myaccount" element={<MyAccount/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/saved-reviews" element={<SavedReviews />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/dropit" element={<DropIt />} />
       
      </Routes>
    </div>
  );
}

export default App;

