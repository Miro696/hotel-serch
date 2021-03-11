
import React, { useEffect, useState } from 'react';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
import { validateEmail } from '../../helpers/validations';
import useAuth from '../../hooks/useAuth';
import axios from '../../axios/axios-auth';

const ProfileDetails = (props) => { 
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(auth.email);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email:'',
    password:''
  });
const [success, setSuccess] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const data = {
        idToken : auth.token,
        email: email,
        returnSecureToken: true
      };

      if (password) {
        data.password = password;
      }

      const res = await axios.post('accounts:update', data);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      });
      setSuccess(true);
    } catch (ex) {
      setErrors({...errors, userId:'No Authoraized'})
    } 
    setLoading(false)
  }
  
  useEffect(() => {
    if(validateEmail(email)) {
      setErrors({...errors, email:''})
    }else {
      setErrors({...errors, email:'wrong email'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[email])

  useEffect(() => {
    if(password.length >= 4 || !password ) {
      setErrors({...errors, password:''})
    }else {
      setErrors({...errors, password:'wrong password'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[password])
 

  return(
    <div className="mt-3 form-group">
     <form  onSubmit={submit}>
       {success ? <div className="alert alert-success">Success updated</div> : null}
       <label htmlFor="email">Email Address</label>
       <input
       className={`form-control is-valid ${errors.email ? 'is-invalid' : 'is-valid'}` }
        onChange={e=> setEmail(e.target.value)}
        value={email}
         name="email"
         type="email"
       />
       <div className="invalid-feedback">Please write correct email</div>
       <div className="valid-feedback">Correct email</div>
        <label htmlFor="password">Password</label>
       <input
       onChange={e=> setPassword(e.target.value)}
       value={password}
       className={`form-control is-valid ${errors.password ? 'is-invalid' : 'is-valid'}` }
         name="password"
         type="password"
       />
       <div className="valid-feedback">Min 4 characters</div>
       <LoadingButton loading={loading} label="Login">Update</LoadingButton>
     </form>
     </div>
  );    
}

export default ProfileDetails;