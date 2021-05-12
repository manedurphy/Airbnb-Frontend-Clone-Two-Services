import styled from 'styled-components';

export default styled.div`
    padding: 0 80px;
    padding-top: 24px;
    display: flex;
    justify-content: center;

    @media (max-width: 1128px) {
        padding: 0 40px;
        padding-top: 24px;
    }

    @media (max-width: 743px) {
        padding: 24px 24px 0 24px;
    }
`;
