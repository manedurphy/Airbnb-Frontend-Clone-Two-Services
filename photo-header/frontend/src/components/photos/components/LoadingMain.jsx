import React from 'react';
import LoadingMainImg from '../styled-components/LoadingMainImg';
import LoadingMainBox from '../styled-components/LoadingMainBox';
import LoadingMainContainer from '../styled-components/LoadingMainContainer';

const LoadingMain = () => (
    <LoadingMainBox>
        <LoadingMainContainer>
            <LoadingMainImg className={'loading-photo'} />
        </LoadingMainContainer>
    </LoadingMainBox>
);

export default LoadingMain;
