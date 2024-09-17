import React from 'react';
import { Link } from 'react-router-dom';


const MyAccount = () => {
  return (
    <div className="MyAccount">
      <h1>My Account</h1>
      <nav>
        <ul>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/my-posts">My Posts</Link>
          </li>
          <li>
            <Link to="/saved-reviews">Saved Reviews</Link>
          </li>
          <li>
            <Link to="/chats">Chats</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MyAccount;

