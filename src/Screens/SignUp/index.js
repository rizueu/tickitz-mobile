import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../Helpers/http';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {Button, Separator, Loading} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../Redux/actions/main';

const SignUp = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [peekPassword, setPeekPassword] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(5, 'Password length must be at least 5 Characters')
      .required('Password is required'),
  });

  function showPassword() {
    if (peekPassword === false) {
      setPeekPassword(true);
    } else {
      setPeekPassword(false);
    }
  }

  const submitHandler = async (body) => {
    const credentials = new URLSearchParams();
    credentials.append('email', body.email);
    credentials.append('password', body.password);
    dispatch(setLoading());
    try {
      const response = await http().post('auth/register?v=Mobile', credentials);
      dispatch(setLoading());
      showMessage({
        message: response.data.message,
        type: 'success',
        duration: 3000,
        hideOnPress: true,
      });
      navigation.navigate('SignIn');
    } catch (error) {
      dispatch(setLoading());
      setError(error.response.data.message);
    }
  };

  React.useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Container>
        <Text style={{fontSize: 25, marginVertical: 20}} heavy>
          Sign Up
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
                    name="email"
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
                    name="password"
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
                {((errors && touched) || error) && (
                  <Text style={{color: 'red', marginTop: 10}} center>
                    {errors.email
                      ? errors.email
                      : errors.password
                      ? errors.password
                      : error}
                  </Text>
                )}
                <Button
                  style={{paddingVertical: 15, marginTop: 30}}
                  onPress={() => handleSubmit()}
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
      <Loading />
    </ScrollView>
  );
};

export default SignUp;

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
