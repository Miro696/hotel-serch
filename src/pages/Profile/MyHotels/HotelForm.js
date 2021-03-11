import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import Input from '../../../components/Input/Input';
import { validate } from '../../../helpers/validations';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

// ***********************************************
const HotelForm = (props) => {
  const [auth] = useAuth();
  const [loading, setLoading ] = useState(false);
  const [form, setForm ] = useState({
    name: {
      value: '',
      error: '',
      showError:false,
      rules: ['required', {rule: 'min', length: 2 }]
    },
    city: {
      value: '',
      error: '',
      showError:false,
      rules: ['required']
    },
    description:  {
      value: '',
      error: '',
      showError:false,
      rules: ['required',{rule: 'min', length: 10 }]
    },
    rooms:  {
      value: 0,
      error: '',
      showError:false,
      rules: ['required']
    },
    features: {
      value: [],
      error: '',
      showError:false,
    },
    rating: {
      value: 0,
      error: '',
      showError:false,
      rules: []
    },
    status: {
      value: "0",
      error: '',
      showError:false,
      rules: ['required']
    }
  });
   
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
 try {
    props.onSubmit({
      name: form.name.value,
      city: form.city.value,
      description: form.description.value,
      rooms: form.rooms.value,
      features: form.features.value,
      rating: form.rating.value,
      status: form.status.value,
      user_id: auth.userId
    });
 } catch (ex) {
  console.log(ex);
   setLoading(false);
 }
};
  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);

    setForm({...form, 
      [fieldName]: {...form[fieldName], 
        value: value, 
        showError: true,
        error: error}})
  };

useEffect(() => {
  const newForm = {...form};
  for (const key in props.hotel) {
  newForm[key].value = props.hotel[key]; 
}
setForm(newForm);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.hotel])
  
  return(
    <form onSubmit={submit}>
    <Input
      label= "Name"
      value= {form.name.value}
      onChange={val => changeHandler(val, 'name')}
      error={form.name.error}
      showError={form.name.showError}
      />
    <Input
      label= "City"
      value= {form.city.value}
      onChange={val => changeHandler(val, 'city')}
      error={form.city.error}
      showError={form.city.showError}
      />
    <Input
      label= "Description"
      type="textarea"
      value= {form.description.value}
      onChange={val => changeHandler(val, 'description')}
      error={form.description.error}
      showError={form.description.showError}
      />
    <Input
      label="Many rooms "
      type="select"
      value= {form.rooms.value}
      onChange={val => changeHandler(val, 'rooms')}
      options={[
        {value:1, label: 1},
        {value:2, label: 2},
        {value:3, label: 3},
        {value:4, label: 4}
      ]}
      error={form.rooms.error}
      showError={form.rooms.showError}
      />
      <h3>Additions</h3>
    <Input
      name="Additions"
      type="checkbox"
      value= {form.features.value}
      onChange={val => changeHandler(val, 'features')}
      options={[
        {value: 'tv', label: 'TV'},
        {value: 'wifi', label: 'Wi-Fi'},
        {value: 'parking', label: 'Parking'}
        ]}
        error={form.features.error}
        showError={form.features.showError}
      />
      <h4>Photo</h4>
      <div className="form-group">
        <Input 
          type="file"
          onChange={val => changeHandler(val, 'image')} 
        />
      </div>
      <h3>Status</h3>
    <Input
      type="radio"
      name= "status"
      value= {form.status.value}
      onChange={val => changeHandler(val, 'status')}
      options={[
        {value: '1', label: 'Aktiv'},
        {value: '0', label: 'Hidden'},
        ]}
        error={form.status.error}
        showError={form.status.showError}
      />
    <div className="text-right">
      <LoadingButton 
        loading={loading}>
          {props.buttonText}
      </LoadingButton>
  </div>
  </form>
  )
}

export default HotelForm;