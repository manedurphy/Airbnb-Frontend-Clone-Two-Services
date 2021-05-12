import styled from 'styled-components';

export default styled.div`
    display: flex;
    padding-bottom: 48px;
    margin-left: -8px;
    margin-right: -8px;
    width: calc(100% + 16px);

    @media (max-width: 743px) {
        flex-direction: column;
    }
`;
