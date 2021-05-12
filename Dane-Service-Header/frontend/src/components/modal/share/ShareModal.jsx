import React from 'react';
import ShareModalBackground from './styled-components/ShareModalBackground';
import ShareModalContent from './components/ShareModalContent';
import ShareModalFlex from './styled-components/ShareModalFlex';
import { useDispatch, useSelector } from 'react-redux';
import {
    getModalState,
    setShowShareModal,
} from '../../../redux/slices/modal/modalSlice';

const ShareModal = () => {
    const dispatch = useDispatch();
    const { showShareModal } = useSelector(getModalState);

    return (
        <ShareModalBackground
            onClick={() => dispatch(setShowShareModal(false))}
            showShareModal={showShareModal}
        >
            <ShareModalFlex>
                <ShareModalContent />
            </ShareModalFlex>
        </ShareModalBackground>
    );
};

export default ShareModal;
