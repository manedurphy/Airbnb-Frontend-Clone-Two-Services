import React from 'react';
import Ratio from '../../styled-components/Ratio';
import Padding from '../../styled-components/Padding';
import PhotosGrid from '../../styled-components/PhotosGrid';
import PhotosContainer from '../../styled-components/PhotosContainer';
import LoadingLeft from '../grid/loading/LoadingLeft';
import LoadingMiddle from '../grid/loading/LoadingMiddle';
import LoadingRight from '../grid/loading/LoadingRight';

const LoadingPhotos = () => (
    <Padding>
        <PhotosContainer>
            <Ratio>
                <PhotosGrid>
                    <LoadingLeft />
                    <LoadingMiddle />
                    <LoadingRight />
                </PhotosGrid>
            </Ratio>
        </PhotosContainer>
    </Padding>
);

export default LoadingPhotos;
