import styled from 'styled-components';

export default styled.div`
    width: 376px;
    height: 794px;
    margin-top: 64px;
    margin-bottom: 64px;
    border: 1px solid black;
    background-color: #fff;
    padding: 32px;

    @media (max-width: 743px) {
        width: 100%;
        height: 100%;
        border: none;
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;
