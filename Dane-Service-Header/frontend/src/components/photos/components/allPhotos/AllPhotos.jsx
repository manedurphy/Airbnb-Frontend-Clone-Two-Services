import React from 'react';
import Ratio from '../../styled-components/Ratio';
import Padding from '../../styled-components/Padding';
import LeftPhoto from '../grid/LeftPhoto';
import MiddlePhotos from '../grid/MiddlePhotos';
import EndPhotos from '../grid/EndPhotos';
import PhotosGrid from '../../styled-components/PhotosGrid';
import PhotosContainer from '../../styled-components/PhotosContainer';
import ShowAllButton from '../ShowAllButton';

const AllPhotos = (props) => (
    <Padding>
        <PhotosContainer>
            <Ratio>
                <PhotosGrid>
                    <LeftPhoto
                        photo={props.photos[0]}
                        handleClick={props.handleClick}
                    />
                    <MiddlePhotos
                        photo1={props.photos[1]}
                        photo2={props.photos[3]}
                        handleClick={props.handleClick}
                    />
                    <EndPhotos
                        photo1={props.photos[2]}
                        photo2={props.photos[4]}
                        handleClick={props.handleClick}
                    />
                    <ShowAllButton photo={props.photos[0]} />
                </PhotosGrid>
            </Ratio>
        </PhotosContainer>
    </Padding>
);

export default AllPhotos;
