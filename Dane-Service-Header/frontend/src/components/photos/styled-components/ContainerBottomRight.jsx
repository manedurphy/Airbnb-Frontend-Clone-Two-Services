import styled from 'styled-components';

export default styled.div`
    position: relative;
    border-bottom-right-radius: 1rem;
    overflow: hidden;
    grid-column-start: 4;
    grid-column-end: span 1;
    grid-row-start: 2;
    grid-row-end: span 1;
    cursor: pointer;

    &:hover::after {
        border-bottom-right-radius: 1rem;
    }
`;
