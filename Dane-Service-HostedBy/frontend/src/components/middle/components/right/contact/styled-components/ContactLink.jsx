import styled from 'styled-components';

export default styled.a`
    cursor: pointer;
    display: inline-block;
    margin: 0;
    text-align: center;
    border: 1px solid rgb(34, 34, 34);
    border-radius: 8px;
    padding: 13px 23px;
    color: rgb(34, 34, 34);
    text-decoration: none;
    transition: box-shadow 0.2s ease 0s;
    outline: none;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;

    &:hover {
        background-color: rgb(247, 247, 247);
        border-color: rgb(0, 0, 0);
    }

    @media (max-width: 743px) {
        width: 100%;
    }
`;
