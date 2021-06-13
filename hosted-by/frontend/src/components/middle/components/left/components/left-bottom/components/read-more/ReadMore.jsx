import React from 'react';
import ReadMoreButton from './styled-components/ReadMoreButton';

const ReadMore = (props) => (
    <ReadMoreButton className={'font'} onClick={props.handleClick}>
        read more
    </ReadMoreButton>
);

export default ReadMore;
