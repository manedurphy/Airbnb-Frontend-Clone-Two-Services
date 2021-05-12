import React from 'react';
import TitleContainer from './styled-components/TitleContainer';
import TitleBox from './styled-components/TitleBox';
import LoadingHeader from './components/header/LoadingHeader';
import LoadingTitleBox from './styled-components/LoadingTitleBox';

const LoadingTitle = () => (
    <TitleContainer>
        <TitleBox>
            <LoadingTitleBox className={'loading-photo'} />
            <LoadingHeader />
        </TitleBox>
    </TitleContainer>
);

export default LoadingTitle;
