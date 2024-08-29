import {  NavLink} from 'react-router-dom';

function NavBar() {
  

    return (
     <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>  
     </nav>
    )
  }
  
  export default NavBar;
  

  