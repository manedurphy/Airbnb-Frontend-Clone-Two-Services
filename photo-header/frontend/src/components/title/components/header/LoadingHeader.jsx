import React from 'react';
import LoadingDetails from '../../styled-components/LoadingDetails';
import HeaderFlex from '../../styled-components/HeaderFlex';
import HeaderContainer from '../../styled-components/HeaderContainer';

const LoadingHeader = () => (
    <HeaderContainer>
        <HeaderFlex>
            <LoadingDetails className={'loading-photo'} />
        </HeaderFlex>
    </HeaderContainer>
);

export default LoadingHeader;
