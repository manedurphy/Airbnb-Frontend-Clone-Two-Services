import React from 'react';
import IconGroup from './styled-components/IconGroup';
import Underline from './styled-components/Underline';
import { IoShareOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setShowShareModal } from '../../../../redux/slices/modal/modalSlice';

const Share = () => {
    const dispatch = useDispatch();
    return (
        <IconGroup onClick={() => dispatch(setShowShareModal(true))}>
            <IoShareOutline title={'share-icon'} />
            <Underline>Share</Underline>
        </IconGroup>
    );
};

export default Share;
