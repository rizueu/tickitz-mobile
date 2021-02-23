import React from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Button, Footer} from '../../Components';

const Order = (props) => {
  const seatNum = ['1', '2', '3', '4', '5', '6', '7'];
  const seatNumRight = ['8', '9', '10', '11', '12', '13', '14'];
  const seatAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <ScrollView>
      <Container>
        <Text style={{marginVertical: 30}} title>
          Choose Your Seat
        </Text>
        <Card>
          <Screen />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Seats style={{marginRight: 5}}>
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              {/* {[...Array(49)].map((element, index) => {
                <React.Fragment key={String(index)}>
                  <Seat />
                </React.Fragment>;
              })} */}
            </Seats>
            <Seats>
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />

              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              <Seat />
              {/* {[...Array(49)].map((element, index) => {
                <React.Fragment key={String(index)}>
                  <Seat />
                </React.Fragment>;
              })} */}
            </Seats>
          </View>
          <Text style={{marginVertical: 25}} title>
            Seating Key
          </Text>
          <Row>
            <Col>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Icon style={{marginRight: 20}} name="arrow-down" size={20} />
                <Text gray>A - G</Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                <Available />
                <Text gray>Available</Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                <LoveNest />
                <Text gray>Love Nest</Text>
              </View>
            </Col>
            <Col>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Icon style={{marginRight: 20}} name="arrow-right" size={20} />
                <Text gray>1 - 14</Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                <Selected />
                <Text gray>Selected</Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                <Sold />
                <Text gray>Sold</Text>
              </View>
            </Col>
          </Row>
        </Card>
        <Card style={{marginTop: 20}}>
          <Button style={{paddingVertical: 15}} variant="outlined-primary">
            <Text primary>Add new seat</Text>
          </Button>
        </Card>
        <Button
          onPress={() => props.navigation.navigate('Payment')}
          style={{paddingVertical: 15, marginVertical: 20}}
          variant="primary">
          <Text white>Checkout now</Text>
        </Button>
      </Container>
      <Footer />
    </ScrollView>
  );
};

export default Order;

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

  ${({title, small}) => {
    switch (true) {
      case title:
        return 'font-size: 20px;';
      case small:
        return 'font-size: 14px;';
    }
  }}

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
  background-color: #f5f6f8;
`;

const Card = styled.View`
  background-color: white;
  padding: 50px 20px;
  width: 100%;
  border-radius: 10;
`;

const Screen = styled.View`
  background-color: #9570fe;
  height: 5px;
  margin-bottom: 10px;
  border-radius: 2px;
`;

const Seats = styled.View`
  display: flex;
  width: 50%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Seat = styled.Text`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-top: 5px;
  background-color: #d6d8e7;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Col = styled.View`
  width: 50%;
`;

const Available = styled.View`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background-color: #d6d8e7;
  border-radius: 5px;
`;

const LoveNest = styled.View`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background-color: #f589d7;
  border-radius: 5px;
`;

const Selected = styled.View`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background-color: #5f2eea;
  border-radius: 5px;
`;

const Sold = styled.View`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background-color: #6e7191;
  border-radius: 5px;
`;
