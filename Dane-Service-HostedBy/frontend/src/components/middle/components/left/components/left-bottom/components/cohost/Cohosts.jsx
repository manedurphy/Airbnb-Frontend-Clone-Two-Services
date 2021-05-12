import React from 'react';
import Flex from '../../../../../../../../constants/styled-components/Flex';
import TitleFont from '../../styled-components/TitleFont';
import CohostName from './styled-components/CohostName';
import CohostImg from './styled-components/CohostImg';
import CohostDisplay from './styled-components/CohostDisplay';
import CohostContainer from './styled-components/CohostContainer';

const Cohosts = (props) => (
    <CohostDisplay>
        <TitleFont>Co-hosts</TitleFont>
        <Flex>
            {props.cohosts.map((cohost, i) => {
                return (
                    <CohostContainer key={i}>
                        <CohostImg src={cohost.Host.avatar} />
                        <CohostName>{cohost.Host.name}</CohostName>
                    </CohostContainer>
                );
            })}
        </Flex>
    </CohostDisplay>
);

export default Cohosts;
