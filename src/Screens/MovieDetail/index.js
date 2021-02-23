import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {Ebv, Cineone, Hiflix} from '../../Assets/Images/Cinemas';
import {Button, Footer} from '../../Components';

export class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
    };
  }

  showDatePicker = () => {
    this.state = {
      show: true,
    };
  };

  hideDatePicker = () => {
    this.setState({
      show: false,
    });
  };

  handleConfirm = (date) => {
    this.setState({
      date: date,
    });
    this.hideDatePicker();
  };

  render() {
    const {date, show} = this.state;
    return (
      <ScrollView>
        <Container>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <MovieCard>
              <Image
                source={require('../../Assets/Images/Movies/spiderMan.png')}
              />
            </MovieCard>
            <Text style={{fontSize: 22, marginTop: 20}}>
              Spider-Man: Homecoming
            </Text>
            <Text style={{fontSize: 16}} gray>
              Adventure, Action, Sci-Fi
            </Text>
            <Row>
              <Col>
                <Text gray>Release Date</Text>
                <Text>June 28, 2017</Text>
                <Text style={{marginTop: 20}} gray>
                  Duration
                </Text>
                <Text>2 hrs 13 min</Text>
              </Col>
              <Col>
                <Text gray>Directed by</Text>
                <Text>Jon Watss</Text>
                <Text style={{marginTop: 20}} gray>
                  Casts
                </Text>
                <Text>Tom Holland, Robert Downey Jr., etc.</Text>
              </Col>
            </Row>
            <Separator />
            <Synopsis>
              <Text style={{fontSize: 16}}>Synopsis</Text>
              <Text style={{color: '#4E4B66', marginTop: 20}}>
                Thrilled by his experience with the Avengers, Peter returns
                home, where he lives with his Aunt May, under the watchful eye
                of his new mentor Tony Stark, Peter tries to fall back into his
                normal daily routine - distracted by thoughts of proving himself
                to be more than just your friendly neighborhood Spider-Man - but
                when the Vulture emerges as a new villain, everything that Peter
                holds most important will be threatened.
              </Text>
            </Synopsis>
          </View>
        </Container>
        <ShowtimeSection style={{paddingVertical: 45}}>
          <Container>
            <PickerSection>
              <Text style={{fontSize: 20}} heavy>
                Showtimes and Tickets
              </Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({show: (currentState) => !currentState})
                }>
                <ButtonShowtimes>
                  <Icon name="calendar" color="#4E4B66" size={20} />
                  <Text style={{color: '#4E4B66', fontSize: 17}}>
                    {moment(date).format('MMMM DD')}
                  </Text>
                  <Icon name="chevron-down" color="#A0A3BD" size={20} />
                </ButtonShowtimes>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.showDatePicker}>
                <ButtonShowtimes>
                  <Icon name="map-marked-alt" color="#4E4B66" size={20} />
                  <Text style={{color: '#4E4B66', fontSize: 17}}>
                    Purwokerto
                  </Text>
                  <Icon name="chevron-down" color="#A0A3BD" size={20} />
                </ButtonShowtimes>
              </TouchableWithoutFeedback>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            </PickerSection>
            <Card>
              <Image style={{resizeMode: 'contain', width: 100}} source={Ebv} />
              <Text style={{fontSize: 15}} gray>
                Whatever street No.12, South
              </Text>
              <Text style={{fontSize: 15}} gray>
                Purwokerto
              </Text>
              <Separator />
              <View style={{display: 'flex', justifyContent: 'center'}}>
                <TimesSection>
                  {[...Array(6)].map((element, index) => {
                    return (
                      <React.Fragment key={String(index)}>
                        <Time>08:30</Time>
                      </React.Fragment>
                    );
                  })}
                </TimesSection>
              </View>
              <PriceSection>
                <Text style={{fontSize: 15}} gray>
                  Price
                </Text>
                <Text style={{fontSize: 15}}>$10.00/seat</Text>
              </PriceSection>
              <View style={{flex: 1}}>
                <ButtonSection>
                  <Button style={{paddingVertical: 10}} variant="primary">
                    <Text
                      onPress={() => this.props.navigation.navigate('Order')}
                      white>
                      Book now
                    </Text>
                  </Button>
                  <Button style={{paddingVertical: 10}}>
                    <Text primary>Add to cart</Text>
                  </Button>
                </ButtonSection>
              </View>
            </Card>
            <Text style={{fontSize: 18, marginTop: 50}} center primary>
              view more
            </Text>
          </Container>
        </ShowtimeSection>
        <Footer />
      </ScrollView>
    );
  }
}

export default MovieDetail;

const styles = StyleSheet.create({
  Picker: {
    display: 'flex',
    width: 250,
    paddingVertical: 17,
    paddingHorizontal: 30,
    backgroundColor: '#eff0f6',
    borderRadius: 5,
    marginTop: 25,
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

const ShowtimeSection = styled.View`
  background-color: #d6d8e7;
`;

const MovieCard = styled.View`
  border: solid #fff 1px;
  padding: 20px;
  border-radius: 5px;
`;

const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 120px;
  margin-top: 25px;
`;

const Col = styled.View`
  width: 50%;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  border: solid #d6d8e7 0.5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Synopsis = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

const PickerSection = styled.View`
  display: flex;
  align-items: center;
`;

const ButtonShowtimes = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 250px;
  padding: 17px 30px;
  background-color: #eff0f6;
  border-radius: 5px;
  margin-top: 15px;
`;

const ButtonSection = styled.View`
  width: 50%;
  display: flex;
  flex-direction: row;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const TimesSection = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const Time = styled.Text`
  font-size: 17px;
  margin-right: 15px;
`;

const PriceSection = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: space-between;
`;
