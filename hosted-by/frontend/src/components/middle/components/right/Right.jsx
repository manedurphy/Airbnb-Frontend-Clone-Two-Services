import React from 'react';
import RightBox from './styled-components/RightBox';
import ResponseInfo from './response-info/ResponseInfo';
import ContactButton from './contact/ContactButton';
import Disclaimer from './disclaimer/Disclaimer';
import { useSelector } from 'react-redux';
import { getHostedByState } from '../../../../redux/slices/hostedBy/hostedBySlice';

const Right = () => {
    const { responseTime, responseRate, host } = useSelector(getHostedByState);

    return (
        <RightBox>
            <ResponseInfo
                time={responseTime}
                rate={responseRate}
                languages={host.languages}
            />
            <ContactButton />
            <Disclaimer />
        </RightBox>
    );
};

export default Right;
