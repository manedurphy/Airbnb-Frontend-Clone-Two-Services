import { combineReducers } from '@reduxjs/toolkit';
import hostedByReducer from './hostedBy/hostedBySlice';

export default combineReducers({
    hostedBy: hostedByReducer,
});
