import styled from 'styled-components';

export default styled.div`
  transition: 0.3s;
  opacity: ${({ showPopup }) => (showPopup ? '1' : '0')};
`;
