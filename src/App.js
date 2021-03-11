import React,{ useReducer }  from 'react';
import Header from './Layout/Header/Header';
import Menu from './components/UI/Menu/Menu';
import style from './App.module.css';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Footer from './Layout/Footer/Footer';
import Layout from './Layout/Layout';
import AuthContext from '../src/context/authContext';
import useWebsiteTitle from './hooks/useWebsiteTitle';
import { reducer, initialState } from './store/reducers/reducer';
import Routes from './routes';
 
//******************App******************** */
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState );
  useWebsiteTitle('main-page'); 

  const header = (
        <Header>
            <Searchbar />
        </Header>
      );
      const menu = <Menu />;
      const content =( <Routes />);
  
      const footer = <Footer/>;
          return(
            <div className={style.container}>
            <AuthContext.Provider value={{
                user: state.user,
                login: (user) => dispatch({type: 'LOGIN', user}),
                logout: () => dispatch({type: 'LOGOUT'})
              }}>
                  <Layout
                    header={header}
                    menu={menu}
                    content={content}
                    footer={footer}
                  />
          </AuthContext.Provider>
          </div>
  )
}

export default App;
