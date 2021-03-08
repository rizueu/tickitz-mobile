import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import {showMessage} from 'react-native-flash-message';

import {useNavigation} from '@react-navigation/native';
import {Button, Separator, Loading} from '../../Components';
import {useSelector, useDispatch} from 'react-redux';

import {login, setNullError} from '../../Redux/actions/auth';
import {setLoading} from '../../Redux/actions/main';

import Icon from 'react-native-vector-icons/FontAwesome5';

const SignIn = () => {
  const errorMsg = useSelector((state) => state.auth.errorMsg);
  const [peekPassword, setPeekPassword] = useState(true);
  // const error = useSelector((state) => state.auth.errorMsg);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function showPassword() {
    if (peekPassword === false) {
      setPeekPassword(true);
    } else {
      setPeekPassword(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(5, 'Password length must be at least 5 Characters')
      .required('Password is required'),
  });

  const checkError = async () => {
    if (errorMsg) {
      setTimeout(() => {
        showMessage({
          message: errorMsg,
          type: 'danger',
          duration: 3000,
          hideOnPress: true,
        });
        dispatch(setLoading());
      }, 3000);
      dispatch(setNullError());
    } else {
      setTimeout(() => {
        showMessage({
          message: 'Successfuly Sign In.',
          type: 'success',
          duration: 3000,
          hideOnPress: true,
        });
        navigation.navigate('Home');
      }, 3000);
    }
  };

  const submitHandler = async (body) => {
    const {email, password} = body;
    dispatch(setLoading());
    await dispatch(login(email, password));
    if (errorMsg) {
      showMessage({
        message: errorMsg,
        type: 'danger',
        duration: 3000,
        hideOnPress: true,
      });
      dispatch(setLoading());
      dispatch(setNullError());
    } else {
      showMessage({
        message: 'Successfuly Sign In.',
        type: 'success',
        duration: 3000,
        hideOnPress: true,
      });
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Container>
        <Text style={{fontSize: 25, marginVertical: 20}} heavy>
          Sign In
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            values,
          }) => {
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
                    secureTextEntry={peekPassword}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => {
                      showPassword();
                    }}>
                    <Icon
                      name={peekPassword ? 'eye' : 'eye-slash'}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 46,
                        marginRight: 20,
                        color: peekPassword ? '#888' : '#752EEA',
                        fontSize: 16,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </InputGroup>
                {errors && touched && (
                  <Text style={{color: 'red', marginTop: 10}} center>
                    {errors.email ? errors.email : errors.password}
                  </Text>
                )}
                <Button
                  style={{paddingVertical: 15, marginTop: 30}}
                  variant="primary"
                  onPress={() => handleSubmit()}>
                  <Text white>Sign In</Text>
                </Button>
                <Text style={{marginTop: 20}} center gray>
                  Forgot your password?
                  <Text onPress={() => navigation.navigate('Forgot')} primary>
                    {' '}
                    Reset now
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
      <Loading />
    </ScrollView>
  );
};

export default SignIn;

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
