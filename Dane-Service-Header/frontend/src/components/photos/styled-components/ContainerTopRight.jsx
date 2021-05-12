import styled from 'styled-components';

export default styled.div`
    position: relative;
    border-top-right-radius: 1rem;
    overflow: hidden;
    grid-column-start: 4;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: span 1;
    cursor: pointer;
    // max-height: 251.8px;

    &:hover::after {
        border-top-right-radius: 1rem;
    }
`;
