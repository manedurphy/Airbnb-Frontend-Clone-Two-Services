import { createSlice } from '@reduxjs/toolkit';
import { getHostedByData } from './helpers';

const initialState = {
    duringYourStay: '',
    responseTime: 0,
    responseRate: 0,
    host: {
        name: '',
        about: '',
        numberOfReviews: 0,
        identityVerified: false,
        isSuperhost: false,
        avatar: '',
        joinedOn: '',
        languages: [],
    },
    coHosts: [],
};

const hostedBySlice = createSlice({
    name: 'hostedBy',
    initialState,
    reducers: {
        setHostedByState: (state, action) => {
            return {
                ...state,
                duringYourStay: action.payload.duringYourStay,
                coHosts: action.payload.cohosts,
                responseTime: action.payload.host.responseTime,
                responseRate: action.payload.host.responseRate,
                host: {
                    ...state.host,
                    name: action.payload.host.firstName,
                    about: action.payload.host.about,
                    numberOfReviews: action.payload.host.numberOfReviews,
                    identityVerified: action.payload.host.identityVerified,
                    isSuperhost: action.payload.host.isSuperhost,
                    avatar: action.payload.host.avatar,
                    languages: action.payload.host.languages,
                    joinedOn: action.payload.host.joinedOn,
                },
            };
        },
    },
});

export const { setHostedByState, setAltData } = hostedBySlice.actions;
export const getHostedByState = (state) => state.hostedBy;

export const handleGetHostedByData = (id) => async (dispatch) => {
    try {
        const hostedByData = await getHostedByData(id);
        dispatch(setHostedByState(hostedByData));
    } catch (error) {
        console.log('ERROR GETTING DATA', error);
    }
};

export default hostedBySlice.reducer;
