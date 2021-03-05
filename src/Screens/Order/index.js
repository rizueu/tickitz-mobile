import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import http from '../../Helpers/http';

import {useSelector, useDispatch} from 'react-redux';
import {
  selectSeat,
  setTicketCount,
  setTotalPayment,
  removeSeat,
  setPersonalInfo,
  setPaymentMethod,
  setMessage,
} from '../../Redux/actions/order';

import {Button, Footer} from '../../Components';

const Order = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const seats = useSelector((state) => state.order.seats);
  const token = useSelector((state) => state.auth.token);
  const [soldSeat, setSoldSeat] = useState([]);
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);

  const {showTimeId} = route.params;
  const seatNum = ['1', '2', '3', '4', '5', '6', '7'];
  const seatNumRight = ['8', '9', '10', '11', '12', '13', '14'];
  const seatAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const addNewSeat = () => {
    const values = [];
  };

  React.useEffect(() => {
    const getSoldSeat = async () => {
      try {
        const response = await http(token).get(
          `api/v1/soldseats?showTimeId=${showTimeId}`,
        );
        setSoldSeat((current) => {
          return [...current, ...response.data.results];
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSoldSeat();
    if (row && col !== null) {
      dispatch(selectSeat([`${row}${col}`]));
    }
  }, [showTimeId, token, row, col, dispatch]);

  // const selectedSeats = (e) => {
  //   const values =
  //     e.target.value.toLowerCase() === 'f10,f11'
  //       ? e.target.value.split(',')
  //       : e.target.value;
  //   if (typeof values === 'string') {
  //     if (seats.indexOf(values) === -1) {
  //       dispatch(selectSeat([...seats, e.target.value]));
  //     } else {
  //       const prevSeats = [...seats];
  //       prevSeats.splice(prevSeats.indexOf(e.target.value), 1);
  //       dispatch(selectSeat([...prevSeats]));
  //     }
  //   } else {
  //     if (seats.indexOf(values[0]) === -1 && seats.indexOf(values[1]) === -1) {
  //       dispatch(selectSeat([...seats, ...values]));
  //     } else {
  //       const values = e.target.value.split(',');
  //       const prevSeats = [...seats];
  //       values.forEach((item) => {
  //         prevSeats.splice(prevSeats.indexOf(item), 1);
  //       });
  //       dispatch(selectSeat([...prevSeats]));
  //     }
  //   }

  //   dispatch(setTicketCount());
  //   dispatch(setTotalPayment());
  // };

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
              {seatAlphabet.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {seatNum.map((col, colIndex) => (
                    <React.Fragment key={colIndex}>
                      {soldSeat.some((item) => item === `${row}${col}`) ? (
                        <Seat style={{backgroundColor: '#6e7191'}} />
                      ) : // <label>
                      //   <input
                      //     type="checkbox"
                      //     name=""
                      //     id={row + '-' + col}
                      //     value={row + col}
                      //   />
                      //   <div className="checkmark" />
                      // </label>
                      !seats.some((item) => item === `${row}${col}`) ? (
                        <Seat />
                      ) : (
                        // <label>
                        //   <input
                        //     type="checkbox"
                        //     name=""
                        //     id={row + '-' + col}
                        //     value={row + col}
                        //     onChange={selectedSeats}
                        //   />
                        //   <div className="checkmark" />
                        // </label>
                        <Seat style={{backgroundColor: '#5f2eea'}} />
                        // <label>
                        //   <input
                        //     type="checkbox"
                        //     name=""
                        //     id={row + '-' + col}
                        //     value={row + col}
                        //     onChange={selectedSeats}
                        //     defaultChecked
                        //   />
                        //   <div className="checkmark" />
                        // </label>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </Seats>
            <Seats>
              {seatAlphabet.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {seatNumRight.map((col, colIndex) => (
                    <React.Fragment key={colIndex}>
                      {row === 'F' && Number(col) === 10 ? (
                        <React.Fragment>
                          {soldSeat.some((item) => item === `${row}${col}`) ? (
                            <Seat
                              style={{width: 35, backgroundColor: '#6e7191'}}
                            />
                          ) : // <label>
                          //   <input
                          //     type="checkbox"
                          //     name=""
                          //     id={row + '-' + col}
                          //     value={`${row + col},${
                          //       row + (Number(col) + 1)
                          //     }`}
                          //   />
                          //   <div className="checkmark love-nest" />
                          // </label>
                          !seats.some((item) => item === `${row}${col}`) ? (
                            <Seat
                              style={{width: 35, backgroundColor: '#f589d7'}}
                            />
                          ) : (
                            // <label>
                            //   <input
                            //     type="checkbox"
                            //     name=""
                            //     id={row + '-' + col}
                            //     value={`${row + col},${
                            //       row + (Number(col) + 1)
                            //     }`}
                            //     onChange={selectedSeats}
                            //   />
                            //   <div className="checkmark love-nest" />
                            // </label>
                            <Seat
                              style={{width: 35, backgroundColor: '#5f2eea'}}
                            />
                            // <label>
                            //   <input
                            //     type="checkbox"
                            //     name=""
                            //     id={row + '-' + col}
                            //     value={`${row + col},${
                            //       row + (Number(col) + 1)
                            //     }`}
                            //     onChange={selectedSeats}
                            //     defaultChecked
                            //   />
                            //   <div className="checkmark love-nest" />
                            // </label>
                          )}
                        </React.Fragment>
                      ) : row === 'F' && Number(col) === 11 ? null : (
                        <React.Fragment>
                          {soldSeat.some((item) => item === `${row}${col}`) ? (
                            <Seat style={{backgroundColor: '#6e7191'}} />
                          ) : // <label>
                          //   <input
                          //     type="checkbox"
                          //     name=""
                          //     id={row + '-' + col}
                          //     value={row + col}
                          //   />
                          //   <div className="checkmark" />
                          // </label>
                          !seats.some((item) => item === `${row}${col}`) ? (
                            <Seat />
                          ) : (
                            // <label>
                            //   <input
                            //     type="checkbox"
                            //     name=""
                            //     id={row + '-' + col}
                            //     value={row + col}
                            //     onChange={selectedSeats}
                            //   />
                            //   <div className="checkmark" />
                            // </label>
                            <Seat style={{backgroundColor: '#5f2eea'}} />
                            // <label>
                            //   <input
                            //     type="checkbox"
                            //     name=""
                            //     id={row + '-' + col}
                            //     value={row + col}
                            //     onChange={selectedSeats}
                            //     defaultChecked
                            //   />
                            //   <div className="checkmark" />
                            // </label>
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
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
          <CardSeatCode>
            <Picker
              dropdownIconColor="#A0A3BD"
              selectedValue={row}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setRow(itemValue)}>
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="E" value="E" />
              <Picker.Item label="F" value="F" />
              <Picker.Item label="G" value="G" />
            </Picker>
            <Picker
              dropdownIconColor="#A0A3BD"
              selectedValue={col}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCol(itemValue)}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
            </Picker>
          </CardSeatCode>
          <Button
            onPress={addNewSeat}
            style={{paddingVertical: 15}}
            variant="outlined-primary">
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

const styles = StyleSheet.create({
  seatPicker: {
    width: 100,
    height: 100,
    backgroundColor: '#EFF0F6',
  },
  picker: {
    width: '40%',
    height: 55,
    color: '#4E4B66',
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

const CardSeatCode = styled.View`
  border: 0.5px solid #dedede;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20;
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
  ${({loveNest, selected, sold}) => {
    switch (true) {
      case loveNest:
        return `background-color: #f589d7;
                width: 30px`;

      case selected:
        return 'background-color: #5f2eea;';

      case sold:
        return 'background-color: #6e7191;';
    }
  }}
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
