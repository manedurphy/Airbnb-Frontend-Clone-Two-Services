import React from 'react';
import LeftBox from './styled-components/LeftBox';
import LeftTop from './components/left-top/LeftTop';
import LeftBottom from './components/left-bottom/LeftBottom';
import { useSelector } from 'react-redux';
import { getHostedByState } from '../../../../redux/slices/hostedBy/hostedBySlice';

const Left = () => {
    const hostedBy = useSelector(getHostedByState);
    const { host, duringYourStay, coHosts } = hostedBy;
    return (
        <LeftBox>
            <LeftTop host={host} />
            <LeftBottom
                about={host.about}
                duringYourStay={duringYourStay}
                isSuperhost={host.isSuperhost}
                name={host.name}
                cohosts={coHosts}
            />
        </LeftBox>
    );
};

export default Left;
