import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
  width: 100%;

  margin-top: 50px;

  ul {
    ${({ theme }) => theme.flex('column', 'flex-start', 'flex-start')}
    width: 1000px;

    color: black;
    font-size: ${({ theme }) => theme.fontSizing.m};

    list-style: circle;

    li {
      margin: 10px 0;
    }
  }
`;
