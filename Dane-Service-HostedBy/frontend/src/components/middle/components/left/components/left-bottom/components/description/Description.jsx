import React, { useState, useEffect } from 'react';
import DescriptionFont from '../../styled-components/DescriptionFont';
import ReadMore from '../read-more/ReadMore';

const Description = ({ description }) => {
    const [desc, setDesc] = useState('');
    const [showButton, setShowButton] = useState(true);

    const handleClick = () => {
        setDesc(description);
        setShowButton(false);
    };

    useEffect(() => {
        if (description.length <= 220) {
            setDesc(description);
            setShowButton(false);
        } else {
            setDesc(`${description.split(' ').splice(0, 29).join(' ')}...`);
        }
    }, [description]);

    return (
        <React.Fragment>
            <DescriptionFont className={'font'}>{desc}</DescriptionFont>
            {showButton && <ReadMore handleClick={handleClick} />}
        </React.Fragment>
    );
};

export default Description;
