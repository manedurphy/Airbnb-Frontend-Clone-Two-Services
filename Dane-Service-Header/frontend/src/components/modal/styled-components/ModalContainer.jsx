import styled from 'styled-components';

export default styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: white;
    z-index: 5;
    transition: opacity 0.4s ease-out, bottom 0.4s ease-out;
    bottom: ${(props) => (props.showModal ? 0 : '-100%')};

    @media (max-width: 1127px) {
        display: none;
    }
`;
