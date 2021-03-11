
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon/Loading';
import axios from '../../axios/axios';
import style from './Hotel.module.css';
import useAuth from '../../hooks/useAuth';


// ***********************************************
const HotelDetails = (props) => {
  const history = useHistory();
  const {id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState('5');
  const [auth] = useAuth();



  // const fetchHotel = async () => {
  //   try {
  //     const res = await axios.get(`/hotels/${id}.json`);
  //     console.log(res.data);
  //     setHotel(res.data);
  //     setTitle = ('Hotel - ' + res.data.name);
      
  //   } catch (ex) {
  //     console.log(ex.response);
  //   }
  //   setLoading(false);
  // }

  const rateHotel = async () =>{
    try {
      await axios.put(`/hotels/${id}/rating.json?auth=${auth.token}`, rating );
      history.push('/');
    }catch (ex) { 
      console.log(ex.response);
    }
  }

    useEffect(() => {
      const fetchHotel = async () => {
        try {
          const res = await axios.get(`/hotels/${id}.json`);
          setHotel(res.data); 
        } catch (ex) {
          console.log(ex.response);
        }
        setLoading(false);
      }
     fetchHotel();
    },[id]); 

    return(
      loading ? <LoadingIcon/> : (
        <div className="card">
          <div className="card-header">
            <h1>Hotel: {hotel.name}</h1>
          </div>
              <div className="card-body">
                <img className="img-fluid img-thumbnail mb-4  "
                src={`http://placeimg.com/220/1${Math.floor(Math.random() * 100)}/arch`} 
                alt=""
                 />
                <p>Name: <span className={style.name}>{hotel.name}</span></p>
                <p>City: <span className={style.city}>{hotel.city}</span></p>
                <p>Rating: {hotel.rating ?? 0}</p>
                <p>Features :</p>
                  <ul> 
                    {hotel.features.map(item => 
                      (<li key={item}>{item}</li>))}
                  </ul>
                
                <p><b>Rating:</b> {props.rating ?? 'missing rating'}</p>
                <div className="col-12 mt-2">
                <h4>Description:</h4> 
                <p>{hotel.description}</p>
                <div className="card-footer">
                  {auth ? (
                    <div className="form-group row mt-4">
                      <div className="col">
                        <select 
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        className="form-control form-select-lg mb-3" >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="col">
                        <button className="btn btn-info" onClick={rateHotel}>Feedback</button>
                      </div>
                    </div>
                  ) : null}
                </div>
            </div>
         </div>
        </div>
      )
                    )
  }
  
  export default HotelDetails;
