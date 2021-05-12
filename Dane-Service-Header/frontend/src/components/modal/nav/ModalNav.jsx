import React from 'react';
import Nav from './styled-components/Nav';
import Icons from './Icons';
import CloseButton from './CloseButton';
import PhotoCount from './PhotoCount';
import NavSection from './styled-components/NavSection';
import NavContainer from './styled-components/NavContainer';

const ModalNav = (props) => (
	<NavSection>
		<NavContainer>
			<Nav>
				<CloseButton />
				<PhotoCount {...props} />
				<Icons />
			</Nav>
		</NavContainer>
	</NavSection>
);

export default ModalNav;
