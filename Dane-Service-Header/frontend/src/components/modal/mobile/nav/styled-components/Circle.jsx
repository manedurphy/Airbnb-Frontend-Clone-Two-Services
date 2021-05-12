import styled from 'styled-components';
import Wrapper from './Wrapper';

export default styled.div`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  ${Wrapper}:hover & {
    cursor: pointer;
    background-color: rgba(34, 34, 34, 0.05);
  }
`;
