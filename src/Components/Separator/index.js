import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

const Separator = (props) => {
  return (
    <Wrapper>
      <Line />
      <Text style={{marginHorizontal: 30}} gray>
        {props.children}
      </Text>
      <Line />
    </Wrapper>
  );
};

export default Separator;

const Text = styled.Text`
  font-family: 'Mulish-Regular';

  ${({white, primary, gray}) => {
    switch (true) {
      case white:
        return 'color: #FFF';
      case primary:
        return 'color: #752EEA';
      case gray:
        return 'color: #A0A3BD';
    }
  }};

  ${({center}) => {
    switch (true) {
      case center:
        return 'text-align: center';
    }
  }}

  ${({heavy}) => {
    switch (true) {
      case heavy:
        return 'font-weight: 700';
    }
  }};
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  width: 120px;
  margin-bottom: 30px;
`;

const Line = styled.View`
  width: 100%;
  height: 1;
  border: solid #dedede 1px;
`;
