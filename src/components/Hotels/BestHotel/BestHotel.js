import React, { useEffect, useState, useRef } from 'react';
import style from './BestHotel.module.css';
import moment from 'moment';

 
const BestHotel = (props) => {
  const [time, setTime] = useState('');
  const hotel = props.getHotel();
  const endTime = moment().add(25, 'minutes').add(59, 'seconds');
  let interval = useRef();

  useEffect(()=> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval.current = setInterval(() => {
      const leftTime = -moment().diff(endTime) /1000 ;
      const minutes = Math.floor(leftTime / 60);
      const seconds = Math.floor(leftTime % 60);
      setTime(`${minutes} minutes , ${seconds} seconds`);
    },1000);
    return () => clearInterval(interval.current);
  },[endTime]);

  if(!hotel) return null;
  return(
    <div className={style.container}>
      <div className={`${style.elements}`}>
        <h3>Best offert</h3>
           {/* <a href="#">DETAILS</a> */}
            <p>Name: <span className={style.sizeFont}> {hotel.name}</span></p>
            <p>Rating: <span className={style.sizeFont}>{hotel.rating}</span></p>
      </div> 
      <p>Remaining time: {time}</p>
    </div>
  )
}

export default BestHotel;