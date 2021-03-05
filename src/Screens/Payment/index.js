import React, {Component} from 'react';
import styled from 'styled-components/native';
import http from '../../Helpers/http';
import {View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import Button from '../../component/Button';
import {InputText, InputPhone} from '../../component/Form';

import {connect} from 'react-redux';
import {setPersonalInfo, setPaymentMethod} from '../../Redux/actions/order';
import {setLoading} from '../../Redux/actions/main';

// Import Payment Method
import gpay from '../../Assets/Images/Payment/g-pay.png';
import dana from '../../Assets/Images/Payment/dana.png';
import bca from '../../Assets/Images/Payment/bca.png';
import bri from '../../Assets/Images/Payment/bri.png';
import gopay from '../../Assets/Images/Payment/gopay.png';
import ovo from '../../Assets/Images/Payment/ovo.png';
import visa from '../../Assets/Images/Payment/visa.png';
import paypal from '../../Assets/Images/Payment/paypal.png';

import warning from '../../Assets/Icons/warning.png';

import {Footer, Loading} from '../../Components';
import moment from 'moment';

const PaymentMethod = [gpay, dana, bca, bri, gopay, ovo, visa, paypal];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('First name is required'),
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .min(9, 'Phone number must have at least 9 characters')
    .required('Phone Number is required'),
});

class Payment extends Component {
  render() {
    return (
      <Container>
        <Wrapper space="20px">
          <RowSpaceBetween>
            <TotalLabel>Total Payment</TotalLabel>
            <Text>Rp.{this.props.results.pricePerSeat}.00</Text>
          </RowSpaceBetween>
        </Wrapper>
        <ContainerWrapper>
          <Label>Payment Method</Label>
          <Wrapper radius="16px" space="20px">
            <PaymentWrapper>
              {PaymentMethod.map((item) => {
                return (
                  <PaymentSelect
                    onPress={() => this.props.setPaymentMethod(item)}
                    style={{marginHorizontal: 5}}
                    key={item}>
                    <Image style={{resizeMode: 'contain'}} source={item} />
                  </PaymentSelect>
                );
              })}
            </PaymentWrapper>
            <HrWrape style={{marginVertical: 20}}>
              <Hr />
              <OrText style={{marginHorizontal: 10}}>Or</OrText>
              <Hr />
            </HrWrape>
            <HrWrape style={{marginVertical: 20}}>
              <View>
                <OrText style={{marginHorizontal: 10}}>Pay via cash</OrText>
              </View>
              <TouchableOpacity>
                <ManulPayment>See how it work</ManulPayment>
              </TouchableOpacity>
            </HrWrape>
          </Wrapper>
        </ContainerWrapper>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async () => {
            this.props.setLoading();
            try {
              const response = await http(this.props.token).post(
                'api/v1/transaction',
                {
                  movieId: this.props.results.movieId,
                  cinemaId: this.props.results.cinemaId,
                  timeId: this.props.results.timeId,
                  showTimeId: this.props.results.showTimeId,
                  seats: this.props.results.seats.join(', '),
                  ticketDate: moment(this.props.results.showTimeDate).format(
                    'YYYY-MM-DD',
                  ),
                  ticketTime: this.props.results.ticketTime,
                  ticketCount: 1,
                  movieTitle: this.props.results.movieTitle,
                  cinemaName: this.props.results.cinemaName,
                  cinemaPoster: this.props.results.picture,
                  cinemaCity: this.props.results.cinemaCity,
                  paymentMethod: this.props.results.paymentMethod,
                  totalPayment: 40000,
                },
              );
              showMessage({
                message: response.data.message,
                type: 'success',
                duration: 3000,
                hideOnPress: true,
              });
              this.props.navigation.navigate('Ticket');
            } catch (error) {
              console.log(error);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <ContainerWrapper>
                <Label>Personal Info</Label>
                <Wrapper radius="16px" space="20px">
                  <InputTextStyle
                    label="Full Name"
                    placeholder="Write Your Full Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {errors.name && touched.name ? (
                    <TextError>{errors.name}</TextError>
                  ) : null}
                  <InputTextStyle
                    label="Email"
                    placeholder="Write your email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && touched.email ? (
                    <TextError>{errors.email}</TextError>
                  ) : null}
                  <InputPhoneStyle
                    label="Phone Number"
                    placeholder="Write Your Number"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {errors.phone ? <TextError>{errors.phone}</TextError> : null}
                  <WarningWrapper>
                    <WarningIcon source={warning} />
                    <WarningText>Fill your data correctly.</WarningText>
                  </WarningWrapper>
                </Wrapper>
              </ContainerWrapper>
              <ContainerWrapper>
                <ButtonCheckout
                  height={'40px'}
                  radius={'5px '}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  color={
                    !isValid || values.name === '' || values.phone === ''
                      ? '#D8CCFA'
                      : null
                  }>
                  Checkout
                </ButtonCheckout>
              </ContainerWrapper>
            </>
          )}
        </Formik>
        <Footer />
        <Loading />
      </Container>
    );
  }
}

const Container = styled.ScrollView`
  background-color: #f5f6f8;
`;
const ContainerWrapper = styled.View`
  padding: 20px;
`;
const InputPhoneStyle = styled(InputPhone)`
  margin-bottom: 10px;
`;
const Wrapper = styled.View`
  background-color: #fff;
  border-radius: ${(props) => props.radius || 0};
  padding: ${(props) => props.space || 0};
  margin-bottom: ${(props) => props.marginB || 0};
`;
const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TotalLabel = styled.Text`
  font-family: Muslih-Medium;
  font-size: 16px;
  color: #aaaaaa;
`;
const Text = styled.Text`
  font-family: Muslih-SemiBold;
  font-size: 20px;
  color: #14142b;
`;
const Label = styled(Text)`
  margin-bottom: 10px;
`;
const ButtonCheckout = styled(Button)`
  margin-bottom: 20px;
`;
const InputTextStyle = styled(InputText)`
  margin-bottom: 10px;
`;
const WarningWrapper = styled.View`
  background-color: rgba(244, 183, 64, 0.3);
  padding: 15px 24px;
  border-radius: 16px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;
const WarningIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`;
const WarningText = styled.Text`
  font-family: Muslih-Medium;
  font-size: 14px;
  color: #4e4b66;
`;
const PaymentWrapper = styled.View`
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;
const PaymentSelect = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  border: 1px #aaaa;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Image = styled.Image`
  height: 25px;
  width: 50px;
`;
const TextError = styled.Text`
  font-family: Mulish-Medium;
  font-size: 12px;
  color: red;
`;
const Hr = styled.View`
  border: 0.5px #aaaa;
  height: 0.5px;
  width: 40%;
`;
const HrWrape = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: center;
`;
const OrText = styled.Text`
  font-size: 14px;
  font-family: Mulish-Medium;
`;
const ManulPayment = styled(OrText)`
  color: #5f2eea;
`;

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    results: state.order,
  };
};

const mapDispatchToProps = {setPersonalInfo, setPaymentMethod, setLoading};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
