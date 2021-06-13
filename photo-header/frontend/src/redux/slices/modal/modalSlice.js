import { createSlice } from '@reduxjs/toolkit';
import { setCurrentPhoto } from '../header/HeaderServiceSlice';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModal: false,
        showPopup: true,
        saved: false,
        showShareModal: false,
    },
    reducers: {
        setShowModal: (state, action) => {
            return {
                ...state,
                showModal: action.payload,
            };
        },
        setShowPopup: (state, action) => {
            return {
                ...state,
                showPopup: action.payload,
            };
        },
        setSaved: (state) => {
            return {
                ...state,
                saved: !state.saved,
            };
        },
        setShowShareModal: (state, action) => {
            return {
                ...state,
                showShareModal: action.payload,
            };
        },
    },
});

export const { setShowModal, setShowPopup, setSaved, setShowShareModal } = modalSlice.actions;
export const getModalState = (state) => state.modal;

export const handleTransition = (photo, index) => (dispatch) => {
    dispatch(setShowPopup(false));

    setTimeout(() => {
        dispatch(setCurrentPhoto({ current: photo, currentIndex: index }));
        dispatch(setShowPopup(true));
    }, 150);
};

export default modalSlice.reducer;
