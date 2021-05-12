import { createSlice } from '@reduxjs/toolkit';
import { getServiceData } from './requestFunctions';

const headerServiceSlice = createSlice({
    name: 'header',
    initialState: {
        photos: {
            allPhotos: [],
            current: null,
            currentIndex: 0,
            groups: [],
        },
        reviews: {
            numberOfReviews: 0,
            rating: 4.52,
        },
        location: {
            city: '',
            state: '',
            country: '',
        },
        host: {
            isSuperhost: false,
        },
        loading: true,
    },
    reducers: {
        setPhotos: (state, action) => {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    allPhotos: action.payload,
                },
            };
        },
        setCurrentPhoto: (state, action) => {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    current: action.payload.current,
                    currentIndex: action.payload.currentIndex,
                },
            };
        },
        setGroups: (state, action) => {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    groups: action.payload,
                },
            };
        },
        setReviews: (state, action) => {
            return {
                ...state,
                reviews: action.payload,
            };
        },
        setLocation: (state, action) => {
            return {
                ...state,
                location: action.payload,
            };
        },
        setHost: (state, action) => {
            return {
                ...state,
                host: {
                    isSuperhost: action.payload,
                },
            };
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setState: (state, action) => {
            return {
                ...state,
                photos: {
                    ...state.photos,
                    allPhotos: action.payload.photos,
                    current: action.payload.photos[0],
                    currentIndex: 0,
                },
                reviews: action.payload.reviews,
                location: action.payload.location,
                host: {
                    isSuperhost: action.payload.isSuperhost,
                },
                loading: false,
            };
        },
    },
});

export const {
    setPhotos,
    setCurrentPhoto,
    setGroups,
    setReviews,
    setLocation,
    setHost,
    setState,
    setLoading,
} = headerServiceSlice.actions;

export const getHeaderState = (state) => state.header;
export const getPhotoState = (state) => state.header.photos;

export const handleGetServiceData = (id) => async (dispatch) => {
    try {
        const data = await getServiceData(id);
        if (data) dispatch(setState(data));
    } catch (error) {
        console.log('ERROR IN PHOTO SLICE');
    }
};

export const handleFindCurrent = (photos, id) => (dispatch) => {
    const currentIndex = photos.findIndex((photo) => photo.id === id);
    dispatch(setCurrentPhoto({ current: photos[currentIndex], currentIndex }));
};

export const handleGroupPhotos = (photos) => (dispatch) => {
    const groups = [];
    for (let i = 0; i < photos.length; i += 3) {
        groups.push({
            big: photos[i],
            left: photos[i + 1],
            right: photos[i + 2],
        });
    }
    dispatch(setGroups(groups));
};

export default headerServiceSlice.reducer;
