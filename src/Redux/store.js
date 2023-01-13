import {configureStore} from '@reduxjs/toolkit';

import loginReducer from './permission/loginslice'


export const store = configureStore({
  reducer: {
   
    data1: loginReducer,
  },
 
});