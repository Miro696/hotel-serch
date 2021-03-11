import { useHistory } from 'react-router';
import HotelForm from '../HotelForm';
import axios from '../../../../axios/axios';
import useAuth from '../../../../hooks/useAuth';
// ************************************************************
const AddHotel = () => {
  const history = useHistory();
  const [auth] = useAuth();
 
  const submit = async form => {
    await axios.post(`/hotels.json?auth=${auth.token}`, form);
    history.push('/profile/hotels')
  }

  return(
        <div className="card mt-2">
         <div className="card-header">Add Hotel</div>
          <HotelForm 
          buttonText="Write !"
          onSubmit={ submit }/>

        </div>
  )
}

export default AddHotel;