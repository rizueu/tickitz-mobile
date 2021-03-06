import React from 'react';
import {Image, Text, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';

import success from '../../Assets/Icons/successTicket.png';
import barCode from '../../Assets/Images/barcode.png';
import Footer from '../../Components/Footer';

import {useSelector, useDispatch} from 'react-redux';

function Ticket() {
  const results = useSelector((state) => state.order);

  return (
    <>
      <ScrollView>
        <View style={styles.parentLayer}>
          <View style={styles.cardTicket}>
            <View style={styles.headTicket}>
              <Image source={success} />
              <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 15}}>
                Thank You!
              </Text>
              <Text style={{color: '#AAAAAA'}}>
                Your transaction was successful
              </Text>
            </View>
            <View style={styles.circleRight} />
            <View style={styles.circleLeft} />
          </View>
          <View style={styles.bodyCardTicket}>
            <View style={styles.circleTopLeft} />
            <View style={styles.circleTopRight} />
            <View style={styles.rowBarcode}>
              <Image source={barCode} />
              <Image source={barCode} />
              <Image source={barCode} />
              <Image source={barCode} />
            </View>
            <View style={styles.rowTicketInfo}>
              <View style={styles.cardInfo}>
                <Text style={styles.titleInfo}>Movie</Text>
                <Text style={styles.textValue}>{results.movieTitle}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.titleInfo}>Category</Text>
                <Text style={styles.textValue}>{results.category}</Text>
              </View>
            </View>
            <View style={styles.rowTicketInfo}>
              <View style={styles.cardInfo}>
                <Text style={styles.titleInfo}>Date</Text>
                <Text style={styles.textValue}>
                  {moment(results.showTimeDate).format('dd MMMM')}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.titleInfo}>Time</Text>
                <Text style={styles.textValue}>{results.ticketTime}</Text>
              </View>
            </View>
            <View style={styles.rowTicketInfo}>
              <View style={styles.cardInfo}>
                <Text>Count</Text>
                <Text style={styles.textValue}>{results.ticketCount} pcs</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text>Seats</Text>
                <Text style={styles.textValue}>{results.seats.join(', ')}</Text>
              </View>
            </View>
            <View style={styles.rowBtnTotal}>
              <TouchableOpacity style={styles.btnTotal}>
                <Text>Total</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Rp.{results.totalPayment}.00
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Footer />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  parentLayer: {
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 70,
    backgroundColor: '#5F2EEA',
  },
  cardTicket: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    position: 'relative',
  },
  bodyCardTicket: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 20,
    position: 'relative',
  },
  headTicket: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLeft: {
    position: 'absolute',
    height: 32,
    width: 32,
    backgroundColor: '#5F2EEA',
    borderRadius: 50,
    bottom: -15,
    zIndex: 3,
    left: -17,
  },
  circleTopLeft: {
    position: 'absolute',
    height: 32,
    width: 32,
    backgroundColor: '#5F2EEA',
    borderRadius: 50,
    zIndex: 3,
    top: -15,
    left: -17,
  },
  circleRight: {
    position: 'absolute',
    height: 32,
    width: 32,
    backgroundColor: '#5F2EEA',
    borderRadius: 50,
    zIndex: 3,
    bottom: -15,
    right: -17,
  },
  circleTopRight: {
    position: 'absolute',
    height: 32,
    width: 32,
    backgroundColor: '#5F2EEA',
    borderRadius: 50,
    zIndex: 3,
    top: -15,
    right: -17,
  },
  rowBarcode: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  rowTicketInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowMainTicketInfo: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardInfo: {
    width: 120,
    marginVertical: 30,
  },
  textValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  titleInfo: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  btnTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    borderColor: '#DEDEDE',
  },
  rowBtnTotal: {
    paddingHorizontal: 25,
  },
});

export default Ticket;
