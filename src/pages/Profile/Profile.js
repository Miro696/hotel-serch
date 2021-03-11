import React from 'react';
import style from './Profile.module.css';
import ProfileDetails from './ProfileDetails';
import MyHotels from './MyHotels/MyHotels';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';

const Profile = (props) => {
  const { path, url } = useRouteMatch();
  return(
    <>
      <div className={`${style.container} mt-1`}>
        <div className="card-header">
          <h1>Moj profile</h1>
        </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink exact className="nav-link" to={`${url}`}>Profile</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/hotels`}>Hotels</NavLink>
            </li>
          </ul>  
          <div>
            <Switch>
              <Route path={`${path}/hotels`} component={MyHotels} />  
              <Route path={`${path}`} component={ProfileDetails} />
            </Switch>
          </div>
      </div>
    </>
  )
}

export default Profile;