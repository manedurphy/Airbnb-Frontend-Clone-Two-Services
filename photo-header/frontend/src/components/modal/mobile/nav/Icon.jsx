import React from 'react';
import Hover from '../../nav/styled-components/Hover';
import { IoShareOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setShowShareModal } from '../../../../redux/slices/modal/modalSlice';

const Icon = () => {
    const dispatch = useDispatch();
    return (
        <Hover
            className={'icon'}
            data-testid={'share'}
            onClick={() => dispatch(setShowShareModal(true))}
        >
            <IoShareOutline />
        </Hover>
    );
};

export default Icon;
