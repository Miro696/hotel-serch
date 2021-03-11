import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';


//******************Searchbar*****************************
// component searching hotels based on input name
const Searchbar = (props) => {
  const [term, setTerm] = useState('');
  const inputRef = useRef(null);
  const history = useHistory();
  // props.onSearch() is a function searchHandler() in App component
  const search = () => {
    history.push(`/search/${term}`);
  }

// Event handler onKeyDown: 'Enter'
  const onKeyDownHandler = (e) => {
    if(e.key === 'Enter') {
      search();
    }   
  }

  const focusInput = () => {
    inputRef.current.focus();
  }
  useEffect(() => {
    focusInput();
  },[]);
  
  return(
    <div className='input-group input-group-sm' >
      <input
          ref={inputRef}
          value={term}
          onKeyDown={onKeyDownHandler}
          onChange={e => setTerm(e.target.value)}
          type="text" 
          placeholder="search..."/>
    <button 
      onClick={search}
      className='btn btn-primary ml-1'>
        Search
    </button>
    </div>
  )
}


export default Searchbar; 