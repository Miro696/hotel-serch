import Input from '../../../components/Input/Input';
import { useState} from 'react';
import { validate } from '../../../helpers/validations';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import axios from '../../../axios/axios-auth';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLodaing] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm ] = useState({ 
    email: {
      value: '',
      error: '',
      showError:false,
      rules: ['required', 'email']
    },
    password: {
      value: '',
      error: '',
      showError:false,
      rules: ['required',{rule: 'min', length: 4 }]
    }
});

const valid = !Object.values(form).map(input => input.error).filter(error => error).length;

const submit = async e => {
  e.preventDefault();
  setLodaing(true);

  try {
    const res = await axios.post('accounts:signUp', {
      email: form.email.value,
      password: form.password.value,
      returnSecureToken: true
    });
    setAuth({
      email: res.data.email,
      token: res.data.idToken,
      userId: res.data.localId
    });
    history.push('/');
  } catch (ex) {
    setError(ex.response.data.error.message)
    console.log(ex.response);
    setLodaing(false);
  } 
}

const changeHandler = (value, fieldName) => {
  const error = validate(form[fieldName].rules, value);
  setForm({...form, 
    [fieldName]: {...form[fieldName], 
      value: value, 
      showError: true,
      error: error}})
}

 if (auth) {
  history.push('/');
}

  return(
    <div className="card mt-2">
    <div className="card-header">Register</div>
    <div className="card-body">Fil free to register</div>
        <form onSubmit={submit} className="p-3">
          <Input
          label= "Email"
          type="email"
          value= {form.email.value}
          onChange={val => {console.log(form.email.value); changeHandler(val, 'email')}}
          error={form.email.error}
          showError={form.email.showError}
          />
          <Input
          label= "Password"
          type="password"
          value= {form.password.value}
          onChange={val => changeHandler(val, 'password')}
          error={form.password.error}
          showError={form.password.showError}
          />
           {error ? <div className="alert alert-danger">{error}</div> : null}
            <div className="text-right">
            <LoadingButton 
                disabled={!valid}
                loading={loading}>
                  Register
              </LoadingButton>
            </div>
        </form>
  </div>
 )
}

export default Register;