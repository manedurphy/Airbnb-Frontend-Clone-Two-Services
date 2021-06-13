import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 77px;
  height: 34px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: rgba(34, 34, 34, 0.05);
  }
`;
