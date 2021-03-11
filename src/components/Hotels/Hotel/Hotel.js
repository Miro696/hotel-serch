import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Hotel.module.css';
import useAuth from '../../../hooks/useAuth';
 //Required type of props
const propTypes = {
  name : PropTypes.string.isRequired,
  city : PropTypes.string.isRequired,
  rating : PropTypes.number,
  description : PropTypes.string.isRequired,
}
//****************Exported to Hotels.js
const Hotel = (props) => {
  const [auth] = useAuth();
  const clickHandler = (e) => {
    // e.preventDefault();
    if(props.onOpen) {
      props.onOpen(props)
    }
  }
  return( 
    <div className={`card ${style.hotel}`}>
      <div className="row">
        <div className="col-4">
          <img className="img-fluid img-thumbnail"
          src={`http://placeimg.com/220/1${Math.floor(Math.random() * 100)}/arch`} 
          alt=""
           />
        </div>
          <div className="col-8">
            <div className="row">
              <div className="col">
                <p>Name: <span className={style.name}>{props.name}</span></p>
                <p>City: <span className={style.city}>{props.city}</span></p>
              </div>
              <div className="col py-10 text-center">
                <p>Rating: {props.rating ?? 0}</p>
                <Link 
                onClick={clickHandler}
                to={`/hotels/${props.id}`} 
                className="btn btn-info px-5">  
                  Details
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2">
              <p>{props.description}</p>
              {auth 
              ? <p className="mt-2">Avaliable: {props.rooms}</p>
              : <p className="mt-2">Available: Login</p>
            }
          </div>
      </div>
    </div>
  )
}

Hotel.propTypes = propTypes;
export default Hotel;