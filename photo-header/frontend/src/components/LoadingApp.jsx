import React from 'react';
import LoadingPhotos from './photos/components/allPhotos/LoadingPhotos';
import LoadingTitle from './title/LoadingTitle';
import LoadingMain from './photos/components/LoadingMain';
import Desktop from './photos/styled-components/Desktop';
import Mobile from './photos/styled-components/Mobile';
import AppSection from './styled-components/AppSection';

const LoadingApp = () => (
    <AppSection>
        <Desktop>
            <LoadingTitle />
            <LoadingPhotos />
        </Desktop>
        <Mobile>
            <LoadingMain />
            <LoadingTitle />
        </Mobile>
    </AppSection>
);

export default LoadingApp;
