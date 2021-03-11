
import { useHistory } from 'react-router';
import HotelForm from '../HotelForm';
import axios from '../../../../axios/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
// ************************************************************
const EditHotel = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [auth] = useAuth();

  const submit = async form => {
    await axios.patch(`/hotels/${id}.json?auth=${auth.token}`, form );
    history.push('/profile/hotels')
  }

  // const fetchHotel = async () => {
  //  const res = await axios.get(`/hotels/${id}.json`);
  //  const hotelData = res.data;
  //  delete(hotelData.user_id);
  //   setHotel(hotelData);
  // }

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await axios.get(`/hotels/${id}.json`);
      const hotelData = res.data;
      delete(hotelData.user_id);
       setHotel(hotelData);
     }
    fetchHotel();
  }, [id]);

console.log('z powisla', hotel);
  return(
        <div className="card mt-2">
         <div className="card-header">Edit Hotel</div>
          <HotelForm 
          hotel={hotel}
          buttonText="Write !"
          onSubmit={ submit }/>
        </div>
  )
}

export default EditHotel;