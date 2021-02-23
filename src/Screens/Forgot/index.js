import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import {Button, Separator} from '../../Components';

const Forgot = (props) => {
  return (
    <Container>
      <Text style={{fontSize: 25, marginBottom: 10, marginTop: 20}} heavy>
        Forgot Password
      </Text>
      <Text gray>we'll send a link to your email shortly</Text>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => {
          return (
            <React.Fragment>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  style={{paddingHorizontal: 20}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Write your email"
                />
              </InputGroup>
              <Button
                style={{paddingVertical: 15, marginTop: 30}}
                onPress={handleSubmit}
                variant="primary">
                <Text onPress={() => props.navigation.navigate('Home')} white>
                  Activate now
                </Text>
              </Button>
            </React.Fragment>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Forgot;

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

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

const InputGroup = styled.View`
  margin-top: 20px;
`;

const Label = styled.Text`
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border: 1px solid #dedede;
`;
