import React from 'react';
import Image from './Image';
import Flex from '../../styled-components/Flex';
import Description from './styled-components/Description';

const CurrentPhoto = (props) => (
	<Flex>
		<div>
			<Image link={props.current.link} />
			<Description>
				<span>{props.current.description}</span>
			</Description>
		</div>
	</Flex>
);

export default CurrentPhoto;
