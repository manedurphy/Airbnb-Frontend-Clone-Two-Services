import React from 'react';
import CloseButtonContainer from '../styled-components/CloseButtonContainer';
import { CgClose } from 'react-icons/cg';
import { setShowShareModal } from '../../../../redux/slices/modal/modalSlice';
import { useDispatch } from 'react-redux';

const CloseButton = () => {
  const dispatch = useDispatch();
  return (
    <CloseButtonContainer onClick={() => dispatch(setShowShareModal(false))}>
      <span>
        <CgClose style={{ fontSize: '1.5rem' }} />
      </span>
    </CloseButtonContainer>
  );
};

export default CloseButton;
