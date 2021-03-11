import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useHistory} from 'react-router-dom';
import axios from '../../../axios/axios-auth';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';

// *********************************************
const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth(); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [valid, setValid] = useState(null);
  const [error, setError] = useState('');

  
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

try {
 const res = await axios.post('accounts:signInWithPassword', {
   email: email,
   password: password,
   returnSecureToken: true
 });
 setAuth({
   email: res.data.email,
   token: res.data.idToken,
   userId: res.data.localId
 });
 history.push('/')
}catch (ex) {
  setError(ex.response.data.error.message);
setLoading(false);
 } 
}

  return(
    <div className="mt-3 form-group">
    <h2>Login</h2>
    {valid === false ? (
      <div className="alert alert-danger">Fel login</div>
    ) : null}
     <form  onSubmit={submit}>
       <label htmlFor="email">Email Address</label>
       <input
       className="form-control"
        onChange={e=> setEmail(e.target.value)}
        value={email}
         name="email"
         type="email"
       />
        <label htmlFor="password">Password</label>
       <input
       onChange={e=> setPassword(e.target.value)}
       value={password}
       className="form-control"
         name="password"
         type="password"
       />
       {error ? <div className="alert alert-danger">{error}</div> : null}
       <LoadingButton loading={loading} label="Login">Login</LoadingButton>
     </form>
     </div>
  )
}

export default Login;