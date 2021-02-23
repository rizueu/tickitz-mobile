import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {Button, Separator} from '../../Components';

const SignUp = (props) => {
  return (
    <Container>
      <Text style={{fontSize: 25, marginVertical: 20}} heavy>
        Sign Up
      </Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
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
                  keyboardType="email-address"
                />
              </InputGroup>
              <InputGroup>
                <Label>Password</Label>
                <Input
                  style={{paddingHorizontal: 20}}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Write your password"
                  secureTextEntry
                />
                <Icon name="eye" style={styles.eyeIcon} />
              </InputGroup>
              <Button
                style={{paddingVertical: 15, marginTop: 30}}
                onPress={() => handleSubmit}
                variant="primary">
                <Text white>Join for free</Text>
              </Button>
              <Text style={{marginTop: 20}} center gray>
                Do you already have an account?
                <Text
                  onPress={() => props.navigation.navigate('SignIn')}
                  primary>
                  {' '}
                  Log in
                </Text>
              </Text>
              <Separator>Or</Separator>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity style={{marginRight: 60}}>
                  <Image
                    style={{resizeMode: 'contain'}}
                    source={require('../../Assets/Icons/flat-color-icons_google.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../Assets/Icons/bx_bxl-facebook-circle.png')}
                  />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          );
        }}
      </Formik>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 46,
    marginRight: 20,
    color: '#888',
    fontSize: 16,
  },
});

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
