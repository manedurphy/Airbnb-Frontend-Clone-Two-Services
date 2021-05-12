import styled from 'styled-components';

export default styled.section`
    display: flex;
    justify-content: center;
    padding: 48px 80px;
    padding-top: 0px;
    @media (max-width: 1128px) {
        padding: 48px 40px;
        padding-top: 0px;
    }

    @media (max-width: 743px) {
        padding: 0 24px;
        padding-top: 0px;
    }
`;
