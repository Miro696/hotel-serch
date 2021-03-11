import React,{ useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { objectToArrayWithId } from '../../helpers/firebase';
import axios from '../../axios/axios';
import Hotels from '../../components/Hotels/Hotels';
// *******************************************
const Search =  () => {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);

useEffect(() => {
  const search = async () => {
    try {
      const res = await axios.get('/hotels.json');
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.name.includes(term));
      setHotels(newHotel)
    }catch (ex) {
      console.log(ex.response);
    }
  };
  search();
}, [term]);

  return(
    <>
     <h2>wyniki wyszukiwania "{ term }"</h2>
     <Hotels hotels={hotels} />
     </>
  )
}

export default Search;

