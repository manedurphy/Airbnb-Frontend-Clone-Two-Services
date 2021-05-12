import styled from 'styled-components';

export default styled.div`
    position: relative;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    overflow: hidden;
    grid-column-start: 1;
    grid-column-end: span 2;
    grid-row-start: 1;
    grid-row-end: span 2;
    cursor: pointer;

    &:hover::after {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
    }
`;
