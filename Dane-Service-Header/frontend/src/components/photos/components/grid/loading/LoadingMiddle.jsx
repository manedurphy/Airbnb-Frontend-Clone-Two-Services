import React from 'react';
import ContainerTop from '../../../styled-components/ContainerTop';
import ContainerBottom from '../../../styled-components/ContainerBottom';

const LoadingMiddle = () => (
    <React.Fragment>
        <ContainerTop className={'photo-container loading-photo'} />
        <ContainerBottom className={'photo-container loading-photo'} />
    </React.Fragment>
);

export default LoadingMiddle;
