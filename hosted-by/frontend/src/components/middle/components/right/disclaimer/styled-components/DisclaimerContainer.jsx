import styled from 'styled-components';
import Flex from '../../../../../../constants/styled-components/Flex';

export default styled(Flex)`
    margin-top: 24px;
    max-width: 300px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    align-items: center;

    @media (max-width: 743px) {
        flex-direction: row-reverse;
        justify-content: space-between;
        max-width: 100%;
    }
`;
