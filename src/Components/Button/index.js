import React from 'react';
import styled from 'styled-components';

const index = (props) => {
  return (
    <Button onPress={props.onPress} style={props.style} variant={props.variant}>
      {props.children}
    </Button>
  );
};

export default index;

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;

  ${({variant}) => {
    if (variant === 'outlined-primary') {
      return 'border: solid #752eea 1px';
    } else if (variant === 'primary') {
      return `
              border: none;
              background-color: #752eea;
            `;
    }
  }};
`;
