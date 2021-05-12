import { combineReducers } from '@reduxjs/toolkit';
import headerServiceReducer from './header/HeaderServiceSlice';
import modalReducer from './modal/modalSlice';

export default combineReducers({
    header: headerServiceReducer,
    modal: modalReducer,
});
