import React from 'react';
import CloseButton from './CloseButton';
import ShareModalHeader from './ShareModalHeader';
import ShareModalContainer from '../styled-components/ShareModalContainer';
import ShareModalLinkContainer from '../styled-components/ShareModalLinkContainer';
import ShareModalLink from './ShareModalLink';
import Links from '../Links';

const ShareModalContent = () => (
    <ShareModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton />
        <ShareModalHeader />
        <ShareModalLinkContainer>
            {Links.map((link, i) => (
                <ShareModalLink key={i} link={link} />
            ))}
        </ShareModalLinkContainer>
    </ShareModalContainer>
);

export default ShareModalContent;
