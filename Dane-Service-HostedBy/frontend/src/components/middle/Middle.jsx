import React from 'react';
import MiddleContainer from './styled-components/MiddleContainer';
import Right from './components/right/Right';
import Left from './components/left/Left';

const Middle = () => (
    <MiddleContainer>
        <Left />
        <Right />
    </MiddleContainer>
);

export default Middle;
