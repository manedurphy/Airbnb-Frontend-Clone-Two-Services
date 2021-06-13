import React, { useEffect } from 'react';
import ShareModal from './modal/share/ShareModal';
import Modal from './modal/Modal';
import MobileModal from './modal/mobile/MobileModal';
import Photos from './photos/Photos';
import AppSection from './styled-components/AppSection';
import { useSelector } from 'react-redux';

const LoadingApp = () => {
    const { header, modal } = useSelector((state) => state);
    const { allPhotos } = header.photos;
    const { showModal, showShareModal } = modal;

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];

        if (showModal || showShareModal) {
            body.style.overflowY = 'hidden';
        } else {
            body.style.overflowY = 'visible';
        }
    }, [showModal, showShareModal]);

    return (
        <AppSection>
            <ShareModal />
            <Modal />
            <MobileModal />
            <Photos photos={allPhotos} />
        </AppSection>
    );
};

export default LoadingApp;
