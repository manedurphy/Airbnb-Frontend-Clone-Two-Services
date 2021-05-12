import React from 'react';
import ContactLink from './styled-components/ContactLink';
import ContactButtonContainer from './styled-components/ContactButtonContainer';

const ContactButton = () => {
    return (
        <ContactButtonContainer>
            <ContactLink href={'#'}>Contact Host</ContactLink>
        </ContactButtonContainer>
    );
};

export default ContactButton;
