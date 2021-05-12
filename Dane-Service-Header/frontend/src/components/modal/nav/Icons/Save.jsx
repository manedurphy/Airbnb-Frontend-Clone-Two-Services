import React from 'react';
import Hover from '../styled-components/Hover';
import { useDispatch, useSelector } from 'react-redux';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import {
    getModalState,
    setSaved,
} from '../../../../redux/slices/modal/modalSlice';

const Save = () => {
    const dispatch = useDispatch();
    const { saved } = useSelector(getModalState);

    return (
        <Hover onClick={() => dispatch(setSaved())}>
            {saved ? (
                <IoHeartSharp style={{ color: 'red' }} />
            ) : (
                <IoHeartOutline />
            )}
        </Hover>
    );
};

export default Save;
