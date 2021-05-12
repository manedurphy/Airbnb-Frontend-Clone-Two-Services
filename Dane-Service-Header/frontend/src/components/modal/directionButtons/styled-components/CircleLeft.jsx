import styled from 'styled-components';
import Wrapper from './Wrapper';

export default styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  border-radius: 100%;
  margin-left: 45px;

  ${Wrapper}:hover & {
    cursor: pointer;
    background-color: rgba(34, 34, 34, 0.1);
  }
`;
