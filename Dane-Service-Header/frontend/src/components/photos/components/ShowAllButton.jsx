import React from 'react';
import ShowAllButtonShell from '../styled-components/ShowAllButtonShell';
import SVG from '../styled-components/SVG';
import svg from './icon/icon.svg';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../../redux/slices/modal/modalSlice';
import { setCurrentPhoto } from '../../../redux/slices/header/HeaderServiceSlice';

const ShowAllButton = (props) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setShowModal(true));
        dispatch(setCurrentPhoto({ current: props.photo, currentIndex: 0 }));
    };

    return (
        <ShowAllButtonShell onClick={handleClick}>
            <SVG src={svg} alt={'show-all'} />
            <div>Show all photos</div>
        </ShowAllButtonShell>
    );
};

export default ShowAllButton;
