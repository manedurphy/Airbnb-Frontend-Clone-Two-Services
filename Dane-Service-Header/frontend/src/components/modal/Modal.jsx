import React from 'react';
import ModalContent from './content/ModalContent';
import ModalContainer from './styled-components/ModalContainer';
import { useSelector } from 'react-redux';

const Modal = () => {
    const { modal, header } = useSelector((state) => state);

    return (
        <ModalContainer data-testid={'main-modal'} showModal={modal.showModal}>
            <ModalContent photos={header.photos} />
        </ModalContainer>
    );
};

export default Modal;
