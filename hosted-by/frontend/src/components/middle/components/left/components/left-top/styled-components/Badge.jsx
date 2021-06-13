import styled from 'styled-components';
import Flex from '../../../../../../../constants/styled-components/Flex';

export default styled(Flex)`
    align-items: center;
    margin-bottom: 24px;
    padding: 0 12px;

    @media (max-width: 1064px) {
        margin-left: ${(props) => props.move && '5px'};
    }
`;
