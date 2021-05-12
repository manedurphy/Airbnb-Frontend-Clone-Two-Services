import styled from 'styled-components';

export default styled.img`
	width: 100%;
	height: 100%;
	padding: 0 100px;
	max-height: 75vh;
	object-fit: contain;

	@media (max-height: 500px) {
		max-height: 100vh;
	}
`;
