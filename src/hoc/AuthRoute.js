import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ReducerContext from '../context/reducerContext';

const AuthRoute = (props) => {
  const context = useContext(ReducerContext);
 
  return context.state.user 
  ? <Route {...props} />
  : <Redirect to= "/login" />

}

export default AuthRoute;