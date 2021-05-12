import React, { useState, useEffect } from 'react';
import Link from '../styled-components/Link';
import LinkBox from '../styled-components/LinkBox';
import IconSpan from '../styled-components/IconSpan';
import LinkContainer from '../styled-components/LinkContainer';

const ShareModalLink = (props) => {
	const [copied, setCopied] = useState(false);

	const handleClick = (name) => {
		if (name !== 'Copy Link') return;

		const dummy = document.createElement('input');
		const text = window.location.href;

		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);

		setCopied(true);
	};

	useEffect(() => {
		let mounted = true;
		setTimeout(() => {
			if (mounted) setCopied(false);
		}, 2000);

		return () => {
			mounted = false;
		};
	}, [copied]);

	return (
		<LinkContainer>
			<LinkBox>
				<IconSpan>{<props.link.icon size={'1.2em'} />}</IconSpan>
				<Link onClick={() => handleClick(props.link.name)}>
					{copied ? 'Link Copied' : props.link.name}
				</Link>
			</LinkBox>
		</LinkContainer>
	);
};

export default ShareModalLink;
