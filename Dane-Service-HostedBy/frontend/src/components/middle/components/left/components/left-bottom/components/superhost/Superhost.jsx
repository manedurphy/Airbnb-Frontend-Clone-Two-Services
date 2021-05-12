import React from 'react';
import TitleFont from '../../styled-components/TitleFont';
import DescriptionFont from '../../styled-components/DescriptionFont';

const Superhost = ({ name }) => {
    return (
        <div>
            <TitleFont className={'font'}>{name} is a Superhost</TitleFont>
            <DescriptionFont className={'font'}>
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
            </DescriptionFont>
        </div>
    );
};

export default Superhost;
