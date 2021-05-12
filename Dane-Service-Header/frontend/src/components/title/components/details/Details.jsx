import React from 'react';
import GreyText from './styled-components/GreyText';
import SuperHost from './components/SuperHost';
import RatingText from './styled-components/RatingText';
import DetailsContainer from './styled-components/DetailsContainer';
import { AiTwotoneStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { getHeaderState } from '../../../../redux/slices/header/HeaderServiceSlice';

const Details = () => {
    const { location, reviews, host } = useSelector(getHeaderState);

    return (
        <React.Fragment>
            <DetailsContainer>
                <AiTwotoneStar
                    style={{ color: '#FF385C', marginRight: '0.25rem' }}
                />
                <RatingText>{reviews.rating}</RatingText>
                <GreyText>({`${reviews.numberOfReviews}`})&nbsp;</GreyText>
                <GreyText>·&nbsp;</GreyText>
                {host.isSuperhost && (
                    <React.Fragment>
                        <SuperHost />
                        <GreyText>Superhost&nbsp;</GreyText>
                        <GreyText>·&nbsp;</GreyText>
                    </React.Fragment>
                )}
                <GreyText>{`${location.city}, ${location.state}, ${location.country}`}</GreyText>
            </DetailsContainer>
        </React.Fragment>
    );
};

export default Details;
