import styled from 'styled-components';
import Flex from '../../../../../../../constants/styled-components/Flex';

export default styled(Flex)`
    flex-flow: row wrap;
    margin-left: -12px;
    margin-right: -12px;

    @media (max-width: 743px) {
        flex-flow: column wrap;
    }
`;
