import styled from 'styled-components';
import FlexStart from '../../../constants/styled-components/FlexStart';

export default styled(FlexStart)`
    width: 100%;
    padding-top: 48px;
    margin-bottom: 24px;
    align-items: center;
    border-top: 1px solid rgb(221, 221, 221);

    @media (max-width: 743px) {
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-bottom: 0px;
        padding-top: 32px;
    }
`;
