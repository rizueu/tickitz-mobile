import styled from 'styled-components/native';

export const Card = styled.View`
  border: 1px solid white;
  padding: 20px;
  border-radius: 10px;
  width: 150px;
  height: 200px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const Genre = styled.Text`
  color: gray;
  font-size: 11px;
  text-align: center;
  margin-top: 3px;
`;
