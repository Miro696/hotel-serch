import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import AuthRoute from './hoc/AuthRoute';
import ErrorBoundry from './hoc/ErrorBoundry';
import AddHotel from './pages/Profile/MyHotels/AddHotel/AddHotel';
import EditHotel from './pages/Profile/MyHotels/EditHotel/EditHotel';
import Register from './pages/Auth/Register/Register';
import HotelDetails from './pages/HotelDetails/HotelDetails';

const Routes = () => {
  return(
    <ErrorBoundry>
      <Switch>
        <AuthRoute path="/profile/hotels/edit/:id" component={EditHotel} />
        <AuthRoute path="/profile/hotels/add" component={AddHotel} />
        <AuthRoute path="/profile" component={Profile} />
        <Route path="/hotels/:id" component={ HotelDetails } />   
        <Route path="/search/:term" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/"exact component={Home} /> 
        <Route component={NotFound} />  
      </Switch>
    </ErrorBoundry>
  )
}

export default Routes;