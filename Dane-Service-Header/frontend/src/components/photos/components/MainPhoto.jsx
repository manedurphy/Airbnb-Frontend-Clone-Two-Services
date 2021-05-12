import React from 'react';
import Flex from '../../styled-components/Flex';
import MainImg from '../styled-components/MainImg';
import JustMainContainer from '../styled-components/JustMainContainer';

const JustMain = (props) => (
    <Flex>
        <JustMainContainer onClick={() => props.handleClick(props.photo.id)}>
            <MainImg src={props.photo.link} alt={'house'} />
        </JustMainContainer>
    </Flex>
);

export default JustMain;
