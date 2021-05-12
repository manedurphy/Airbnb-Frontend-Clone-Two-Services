import React from 'react';
import Circle from './styled-components/Circle';
import Wrapper from './styled-components/Wrapper';
import BackButtonContainer from './styled-components/BackButtonContainer';
import Span from './styled-components/Span';
import { useDispatch } from 'react-redux';
import { BsChevronLeft } from 'react-icons/bs';
import { setShowModal } from '../../../../redux/slices/modal/modalSlice';

const BackButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowModal(false));
  };

  return (
    <BackButtonContainer>
      <Wrapper onClick={handleClick}>
        <Circle>
          <Span>
            <BsChevronLeft className={'icon'} />
          </Span>
        </Circle>
      </Wrapper>
    </BackButtonContainer>
  );
};

export default BackButton;
