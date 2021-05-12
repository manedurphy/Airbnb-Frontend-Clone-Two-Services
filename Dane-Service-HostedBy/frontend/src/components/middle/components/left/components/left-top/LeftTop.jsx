import React from 'react';
import Badge from './styled-components/Badge';
import LeftTopContainer from './styled-components/LeftTopContainer';
import SuperHost from '../../../../../icons/SuperHost';
import { MdVerifiedUser } from 'react-icons/md';
import { AiTwotoneStar } from 'react-icons/ai';

const LeftTop = ({ host }) => (
    <LeftTopContainer>
        {host.numberOfReviews && (
            <Badge>
                <AiTwotoneStar className={'icon2'} />
                <span className={'font'}>{host.numberOfReviews} Reviews</span>
            </Badge>
        )}
        {host.identityVerified && (
            <Badge>
                <MdVerifiedUser className={'icon2'} />
                <span className={'font'}>Identity verified</span>
            </Badge>
        )}
        {host.isSuperhost && (
            <Badge move={true}>
                <SuperHost />
                <span className={'font'}>Superhost</span>
            </Badge>
        )}
    </LeftTopContainer>
);

export default LeftTop;
