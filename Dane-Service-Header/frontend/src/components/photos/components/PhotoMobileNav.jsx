import React from 'react';
import Icons from '../../modal/nav/Icons';
import PhotosNavContainer from '../styled-components/PhotosNavContainer';
import NavLink from '../styled-components/NavLink';
import LinkText from '../styled-components/LinkText';
import { FiChevronLeft } from 'react-icons/fi';

const PhotoMobileNav = () => (
    <PhotosNavContainer>
        <NavLink href={'https://www.airbnb.com/'}>
            <FiChevronLeft className={'icon'} />
            <LinkText>Homes · Airbnb</LinkText>
        </NavLink>
        <Icons />
    </PhotosNavContainer>
);

export default PhotoMobileNav;
