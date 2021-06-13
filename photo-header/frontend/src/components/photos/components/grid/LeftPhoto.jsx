import React from 'react';
import LeftImg from '../../styled-components/LeftImg';
import LeftContainer from '../../styled-components/LeftContainer';

const LeftPhoto = (props) => (
    <LeftContainer
        className={'photo-container'}
        data-testid={'left-photo-container'}
        onClick={() => props.handleClick(props.photo.id)}
    >
        <LeftImg src={props.photo.link} alt={'house'} />
    </LeftContainer>
);

export default LeftPhoto;
