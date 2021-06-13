import React from 'react';
import Hover from '../styled-components/Hover';
import { IoShareOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setShowShareModal } from '../../../../redux/slices/modal/modalSlice';

const Share = () => {
  const dispatch = useDispatch();
  return (
    <Hover onClick={() => dispatch(setShowShareModal(true))}>
      <IoShareOutline style={{ marginRight: '1rem' }} />
    </Hover>
  );
};

export default Share;
