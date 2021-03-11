import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from '../../../axios/axios';
import { objectToArrayWithId } from '../../../helpers/firebase';
import useAuth from '../../../hooks/useAuth';

const MyHotels = (props) => {
  const [auth] = useAuth();
  const { url } = useRouteMatch();
  const [hotels, setHotels] = useState([]);
  
// filter should be made on backend
  // const fetchHotels = async () => {
  //   try {
  //     const res = await axios.get(`/hotels.json?auth=${auth.token}`)
  //     const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId)
  //     setHotels(newHotel)
  //   }catch (ex) {
  //     console.log(ex.response);
  //   }
  // }

  const deleteHandler =  async id => {
     try {
      await axios.delete(`/hotels/${id}.json?auth=${auth.token}`);
      setHotels(hotels.filter(x => x.id !== id))
     }catch (ex) {
      console.log(ex.response);
    }
  } 

  useEffect(() => {
    // filter should be made on backend
  const fetchHotels = async () => {
    try {
      const res = await axios.get(`/hotels.json?auth=${auth.token}`)
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId)
      setHotels(newHotel)
    }catch (ex) {
      console.log(ex.response);
    }
  }
    fetchHotels();
  },[auth.userId, auth.token ])

  return(
    <div>
      {hotels.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => ( 
              <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.status === "1"? <span className="badge bg-success text-light">Aktiv</span> 
              : <span className="badge bg-secondary text-light">Hidden</span> }</td>
              <td>
                <Link to={`/profile/hotels/edit/${hotel.id}` } className="btn btn-warning">Edit</Link>
                <button onClick={()=>{deleteHandler(hotel.id)}}
                className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table> )
        : (<h3 className="mt-2 text-center alert-danger">You have no hotels</h3>)}

          <h2 className="text-center mt-3">Add Hotel</h2>
            <Link to={`${url}/add`} className="btn btn-primary mt-5" >Add Hotel</Link>
    </div>
  )
}

export default MyHotels;