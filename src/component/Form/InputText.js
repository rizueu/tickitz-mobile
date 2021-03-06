import React from 'react';
import styled from 'styled-components/native';

function InputText(props) {
  return (
    <Row style={props.style}>
      <Label>{props.label}</Label>
      <FormInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
      />
    </Row>
  );
}

const Row = styled.View``;

const FormInput = styled.TextInput`
  padding: 15px 24px;
  border: solid 1px #a0a3bd;
  border-radius: 16px;
  font-size: 16px;
  font-family: Mulish-Medium;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  color: #a0a3bd;
  font-family: Mulish-Medium;
`;

export default InputText;
