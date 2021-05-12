import React from 'react';
import badge from './badge.svg';
import BadgeIconContainer from './styled-components/BadgeIconContainer';
import DisclaimerContainer from './styled-components/DisclaimerContainer';

const Disclaimer = () => (
    <DisclaimerContainer className={'font'}>
        <BadgeIconContainer>
            <img
                src={`https://fec-corgis.s3.amazonaws.com/static${badge}`}
                alt="badge"
                style={{ width: '24px', height: '24px' }}
            />
        </BadgeIconContainer>
        To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
    </DisclaimerContainer>
);

export default Disclaimer;
