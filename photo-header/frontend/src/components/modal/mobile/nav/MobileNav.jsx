import React from 'react';
import Icon from './Icon';
import BackButton from './BackButton';
import MobileNavContainer from './styled-components/MobileNavContainer';

const MobileNav = () => (
	<MobileNavContainer className={'nav'}>
		<BackButton />
		<Icon />
	</MobileNavContainer>
);

export default MobileNav;
