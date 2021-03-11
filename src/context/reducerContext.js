import { createContext } from 'react';

const ReducerContext = createContext({
  state: {user:true},
  dispatch: ()=> {}
});

ReducerContext.displayName = 'ReducerContext';
export default ReducerContext;