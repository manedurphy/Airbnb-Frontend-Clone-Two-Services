import React from 'react';
import TitleFont from '../../styled-components/TitleFont';
import Description from '../description/Description';

const DuringYourStay = (props) => {
    return (
        <div>
            <TitleFont className={'font'}>During your stay</TitleFont>
            <Description description={props.duringYourStay} />
        </div>
    );
};

export default DuringYourStay;
