import styled from 'styled-components';
import ModalContainer from '../../styled-components/ModalContainer';

export default styled(ModalContainer)`
    overflow-y: scroll;
    display: block;

    @media (min-width: 1128px) {
        display: none;
    }
`;
