import React from 'react';
import IconGroup from './styled-components/IconGroup';
import Underline from './styled-components/Underline';
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
        <IconGroup onClick={() => dispatch(setSaved())}>
            {saved ? (
                <IoHeartSharp
                    style={{ color: 'red' }}
                    title={'save-icon-red'}
                />
            ) : (
                <IoHeartOutline title={'save-icon'} />
            )}
            <Underline>{saved ? 'Saved' : 'Save'}</Underline>
        </IconGroup>
    );
};

export default Save;
