import React from 'react';
import Flex from '../../../styled-components/Flex';
import PhotoGrid from '../styled-components/PhotoGrid';
import PhotoContainer from '../styled-components/PhotoContainer';
import GridBigItem from '../styled-components/GridBigItem';
import GridSmallItemLeft from '../styled-components/GridSmallItemLeft';
import GridSmallItemRight from '../styled-components/GridSmallItemRight';
import GridImg from '../styled-components/GridImg';

const PhotosGrid = (props) => (
    <Flex>
        <PhotoContainer>
            <PhotoGrid>
                {props.big && (
                    <GridBigItem>
                        <GridImg src={props.big} alt={'house'} />
                    </GridBigItem>
                )}
                {props.left && (
                    <GridSmallItemLeft>
                        <GridImg src={props.left} alt={'house'} />
                    </GridSmallItemLeft>
                )}
                {props.right && (
                    <GridSmallItemRight>
                        <GridImg src={props.right} alt={'house'} />
                    </GridSmallItemRight>
                )}
            </PhotoGrid>
        </PhotoContainer>
    </Flex>
);

export default PhotosGrid;
