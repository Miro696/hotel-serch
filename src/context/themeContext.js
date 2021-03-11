
import { createContext } from 'react';

const ThemeContext = createContext({
  theme: 'primary',
  changeTheme: ()=> {}
});

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
