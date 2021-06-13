import React from 'react';
import CloseButtonContainer from './styled-components/CloseButtonContainer';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../../redux/slices/modal/modalSlice';
import { CgClose } from 'react-icons/cg';

const CloseButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowModal(false));
  };

  return (
    <CloseButtonContainer onClick={handleClick}>
      <span style={{ marginRight: '5px', marginTop: '4px' }}>
        <CgClose style={{ fontSize: '1.2rem' }} />
      </span>
      <span>Close</span>
    </CloseButtonContainer>
  );
};

export default CloseButton;
