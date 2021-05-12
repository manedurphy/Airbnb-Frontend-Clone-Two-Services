import React from 'react';
import ContainerTopRight from '../../../styled-components/ContainerTopRight';
import ContainerBottomRight from '../../../styled-components/ContainerBottomRight';

const LoadingRight = () => (
    <React.Fragment>
        <ContainerTopRight className={'photo-container loading-photo'} />
        <ContainerBottomRight className={'photo-container loading-photo'} />
    </React.Fragment>
);

export default LoadingRight;
