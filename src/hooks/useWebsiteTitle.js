import { useEffect } from 'react';

// Changing website tilte
const useWebsiteTitle = (title) => {
  const setTitle = newTitle => {
    document.title = newTitle;
  }
  useEffect(() => {
    if(title) {
      setTitle();
    }
  },[title]);
 return setTitle;   
}
export default useWebsiteTitle;