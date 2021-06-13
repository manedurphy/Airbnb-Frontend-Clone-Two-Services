import React from 'react';
import AllPhotos from './components/allPhotos/AllPhotos';
import MainPhoto from './components/MainPhoto';
import Title from '../title/Title';
import Desktop from './styled-components/Desktop';
import Mobile from './styled-components/Mobile';
import PhotosMobileNav from './components/PhotoMobileNav';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../redux/slices/modal/modalSlice';
import { handleFindCurrent } from '../../redux/slices/header/HeaderServiceSlice';

const Photos = (props) => {
    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(setShowModal(true));
        dispatch(handleFindCurrent(props.photos, id));
    };

    return (
        <React.Fragment>
            <Desktop>
                <Title showIcons={true} />
                <AllPhotos photos={props.photos} handleClick={handleClick} />
            </Desktop>

            <Mobile>
                <PhotosMobileNav />
                <MainPhoto photo={props.photos[0]} handleClick={handleClick} />
                <Title showIcons={false} />
            </Mobile>
        </React.Fragment>
    );
};

export default Photos;
