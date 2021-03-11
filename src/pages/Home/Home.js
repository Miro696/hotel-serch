import React, { useEffect, useState } from 'react';
import Hotels from '../../components/Hotels/Hotels'
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStageStorage';
import Loading from '../../components/UI/LoadingIcon/Loading'
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import { objectToArrayWithId } from '../../helpers/firebase';
import axios from '../../axios/axios';

// ****************************************
const Home = () => {
  useWebsiteTitle('MainPage');
  const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  const openHotel = (hotel) =>setLastHotel(hotel);
  const removeLastHotel= () =>setLastHotel(null);
  
  const getBestHotel = () => {
    if(!hotels.length){
      return null;
    } else {
    return hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
  }
}

const fetchHotels = async () => {
  try {
    const res = await axios.get('/hotels.json');
    const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.status === "1");
    setHotels(newHotel)
  }catch (ex) {
    console.log(ex.response);
  }
  setLoading(false);
}
  useEffect(() => {
   fetchHotels();
  },[]);

  return loading ? <Loading/> : (
    <>
    {getBestHotel() ? 
        <BestHotel getHotel={getBestHotel} /> : null}
    {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel}/> : null}
    <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  )
}

export default Home;