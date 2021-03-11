import React from 'react';
import style from './Menu.module.css';
import useAuth from '../../../hooks/useAuth';
import { NavLink } from 'react-router-dom';


const Menu = () => {
  const [auth , setAuth ] = useAuth();

  const logout = (e) =>{
    e.preventDefault();
    setAuth(false);
  }
  return( 
    <div className={style.container}> 
      <ul className={style.navItem}>
        <li>
          <NavLink exact 
            to="/" 
            activeClassName={style.active}>
            Home
          </NavLink>  
        </li>
        {auth ? 
          (<>
        <li>   
          <NavLink to="#" onClick={logout}>Logout</NavLink> 
        </li>
        <li>
          <NavLink 
            to="/profile" 
            activeClassName={style.active} >
              My Profile
          </NavLink>
        </li>
        </>) : (
        <>
        <li>  
          <NavLink to="/register" activeClassName={style.active}>Register</NavLink>
        </li>
        <li>  
          <NavLink to="/login"activeClassName={style.active} 
          >Login
          </NavLink>
        </li>
        </>
        )} 
      </ul>
    </div>
  )
}

export default Menu;