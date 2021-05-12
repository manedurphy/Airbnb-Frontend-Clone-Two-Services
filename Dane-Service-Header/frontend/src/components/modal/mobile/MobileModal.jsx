import React, { useEffect } from 'react';
import MobileNav from './nav/MobileNav';
import PhotosGrid from './photo/PhotosGrid';
import FadeIn from './styled-components/FadeIn';
import MobileModalContainer from './styled-components/MobileModalContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getModalState } from '../../../redux/slices/modal/modalSlice';
import {
    getPhotoState,
    handleGroupPhotos,
} from '../../../redux/slices/header/HeaderServiceSlice';

const MobileModal = () => {
    const dispatch = useDispatch();
    const { showModal } = useSelector(getModalState);
    const { allPhotos, groups } = useSelector(getPhotoState);

    useEffect(() => {
        dispatch(handleGroupPhotos(allPhotos));
    }, [allPhotos, dispatch]);

    return (
        <MobileModalContainer style={{ bottom: showModal ? 0 : '-100vh' }}>
            <MobileNav />
            <FadeIn className={'fade-in'}>
                {groups.map((group, i) => {
                    return (
                        <PhotosGrid
                            key={i}
                            big={group.big ? group.big.link : null}
                            left={group.left ? group.left.link : null}
                            right={group.right ? group.right.link : null}
                        />
                    );
                })}
            </FadeIn>
        </MobileModalContainer>
    );
};

export default MobileModal;
