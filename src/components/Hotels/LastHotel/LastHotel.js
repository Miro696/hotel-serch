import React from 'react';
import style from './LastHotel.module.css'

const LastHotel = (props) => {
  
return(
  <div className={style.container}>
     <div>
      <h3>Your Last Choice</h3>
    </div>
    <hr/>
    <div className={`${style.elements}`}>
       {/* <a href="#">DETAILS</a> */}
        <p >Name: <span className={style.sizeFont}> {props.name}</span></p>
        <p>City: <span className={style.sizeFont}>{props.city}</span></p>
    </div> 
    <div className="d-flex justify-content-center">
      <button className="btn btn-success">YES</button>
      <button onClick={props.onRemove} className=" btn btn-warning ml-2">No</button>
  </div>
</div>
)
}

export default LastHotel;