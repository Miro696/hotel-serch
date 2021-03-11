import PropTypes from 'prop-types';
import React from 'react';
import Hotel from './Hotel/Hotel';
import style from './Hotels.module.css';
// import ThemeContext from '../../context/themeContext';

//Required props types
const propTypes = {
  hotels: PropTypes.array.isRequired
}
 // Exported to App.js
const Hotels = (props) => {
  // Set props to variable
  const hotels = props.hotels;

  return(
    <div className={style.hotels}> 
      <h2>Hotels</h2>
      {hotels.map(hotel =>( 
        <Hotel 
          onOpen={props.onOpen}
          key={hotel.id} {...hotel}
        />
      ))}
    </div>
  );
} 

Hotels.propTypes = propTypes;

const areEqual = (prevProps, nextProps) => {
  return prevProps.hotels === nextProps.hotels;
}

export default React.memo(Hotels, areEqual);
