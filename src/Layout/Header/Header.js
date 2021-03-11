import React from 'react';
import style from './Header.module.css';
import withMousePosition from '../../hoc/withMousePosition';

const Header = (props) => {

  // Styling for moving picture
  const paralaxStyles = {
    transform: `translate(
      ${props.mouseX /-20}px,
      ${props.mouseY /100}px
    )`
  };

  return(
    <div className={style.header}>
      <div className={style.headerImage}
      style={paralaxStyles}></div>
      {props.children}
    </div>
  )
}


export default withMousePosition(Header);