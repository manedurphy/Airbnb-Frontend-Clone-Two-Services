import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 8px;
    max-height: 53vh;
    min-height: 300px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`;
