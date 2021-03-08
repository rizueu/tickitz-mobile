import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PickerBox from 'react-native-picker-box';
import axios from 'axios';
import {REACT_APP_API_URL as API_URL} from '@env';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {connect} from 'react-redux';
import {getMovieById} from '../../Redux/actions/movies';
import {getShowtimes} from '../../Redux/actions/showtimes';
import {setLoading} from '../../Redux/actions/main';
import {selectTime, setOrder} from '../../Redux/actions/order';

import {Ebv, Cineone, Hiflix} from '../../Assets/Images/Cinemas';
import {Button, Footer} from '../../Components';

export class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.route.params.movieId,
      date: new Date(),
      selectedLocation: 'Purwokerto',
      show: false,
      loading: false,
      times: [],
      timeId: null,
      showTimeId: null,
      timeChoosed: null,
    };
    this.handleOrder = this.handleOrder.bind(this);
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
      date: moment(date).format('yyyy-MM-DD'),
    });
    this.hideDatePicker();
  };

  componentDidMount() {
    this.props.getMovieById(this.state.movieId);
    axios.get(`${API_URL}api/v1/times`).then((response) => {
      this.setState({times: response.data.results});
    });
  }

  componentDidUpdate(props, state) {
    if (
      state.date !== this.state.date ||
      state.selectedLocation !== this.state.selectedLocation
    ) {
      this.setState((state) => ({
        loading: !state.loading,
      }));
      this.props.getShowtimes(
        this.state.movieId,
        this.state.date,
        this.state.selectedLocation,
      );
      setTimeout(() => {
        this.setState((state) => ({
          loading: !state.loading,
        }));
      }, 1000);
    }
  }

  handleOrder(index) {
    this.props.showtimes[index].timeId = this.state.timeId;
    this.props.showtimes[index].showTimeId = this.state.showTimeId;
    this.props.setOrder(this.props.showtimes[index]);
    this.props.navigation.navigate('Order', {
      showTimeId: this.state.showTimeId,
    });
  }

  render() {
    const {date, show, timeId, movieId} = this.state;
    const {movie} = this.props;

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
              <Image style={styles.MovieImage} source={{uri: movie.picture}} />
            </MovieCard>
            <Text style={{fontSize: 22, marginTop: 20}}>{movie.title}</Text>
            <Text style={{fontSize: 16}} gray>
              {movie.genres}
            </Text>
            <Row>
              <Col>
                <Text gray>Release Date</Text>
                <Text>{moment(movie.releaseDate).format('D MMM YYYY')}</Text>
                <Text style={{marginTop: 20}} gray>
                  Duration
                </Text>
                <Text>{movie.duration}m</Text>
              </Col>
              <Col>
                <Text gray>Directed by</Text>
                <Text>{movie.director}</Text>
                <Text style={{marginTop: 20}} gray>
                  Casts
                </Text>
                <Text>{movie.casts}</Text>
              </Col>
            </Row>
            <Separator />
            <Synopsis>
              <Text style={{fontSize: 16}}>Synopsis</Text>
              <Text style={{color: '#4E4B66', marginTop: 20}}>
                {movie.synopsis}
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
                onPress={() => this.setState({show: true})}>
                <ButtonShowtimes>
                  <Icon name="calendar" color="#4E4B66" size={20} />
                  <Text style={{color: '#4E4B66', fontSize: 17}}>
                    {moment(date).format('MMMM DD')}
                  </Text>
                  <Icon name="chevron-down" color="#A0A3BD" size={20} />
                </ButtonShowtimes>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.myref.openPicker()}>
                <ButtonShowtimes>
                  <Icon name="map-marked-alt" color="#4E4B66" size={20} />
                  <Text style={{color: '#4E4B66', fontSize: 17}}>
                    {this.state.selectedLocation}
                  </Text>
                  <Icon name="chevron-down" color="#A0A3BD" size={20} />
                </ButtonShowtimes>
              </TouchableWithoutFeedback>
              <PickerBox
                ref={(ref) => (this.myref = ref)}
                data={[
                  {label: 'Purwokerto', value: 'Purwokerto'},
                  {label: 'Jakarta', value: 'Jakarta'},
                  {label: 'Bandung', value: 'Bandung'},
                ]}
                onValueChange={(value) => {
                  this.setState({selectedLocation: value});
                }}
                selectedValue={this.state.selectedLocation}
              />
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
            </PickerSection>
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <ActivityIndicator size="small" color="#5F2EEA" />
              </View>
            ) : this.props.showtimes.length > 0 ? (
              this.props.showtimes.map((element, showTimesIndex) => {
                return (
                  <Card key={String(showTimesIndex)}>
                    <Image
                      style={{resizeMode: 'contain', width: 100, height: 100}}
                      source={{uri: element.picture}}
                    />
                    <Text style={{fontSize: 15}} gray>
                      {element.address}
                    </Text>
                    <Text style={{fontSize: 15}} gray>
                      {element.city}
                    </Text>
                    <Separator />
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                      <TimesSection>
                        {this.state.times.map((timesElement, index) => {
                          if (
                            element.showTime.indexOf(timesElement.showTime) !==
                            -1
                          ) {
                            return (
                              <React.Fragment key={String(index)}>
                                <Time
                                  style={
                                    this.state.timeChoosed === index
                                      ? {borderWidth: 1}
                                      : null
                                  }
                                  onPress={() => {
                                    this.props.selectTime(
                                      timesElement.showTime,
                                    );
                                    this.setState({
                                      timeChoosed: index,
                                    });
                                    axios
                                      .get(
                                        `${API_URL}api/v1/times/id?showTime=${timesElement.showTime}`,
                                      )
                                      .then((response) => {
                                        this.setState({
                                          timeId: response.data.results,
                                        });
                                        axios
                                          .get(
                                            `${API_URL}api/v1/selected-showtime?showTimeDate=${date}&timeId=${response.data.results}&cinemaId=${element.id}&movieId=${movieId}`,
                                          )
                                          .then((response) =>
                                            this.setState({
                                              showTimeId:
                                                response.data.results
                                                  .showTimeId,
                                            }),
                                          );
                                      });
                                  }}>
                                  {timesElement.showTime}
                                </Time>
                              </React.Fragment>
                            );
                          } else {
                            return (
                              <React.Fragment key={String(index)}>
                                <Time style={{color: 'gray'}}>
                                  {timesElement.showTime}
                                </Time>
                              </React.Fragment>
                            );
                          }
                        })}
                      </TimesSection>
                    </View>
                    <PriceSection>
                      <Text style={{fontSize: 15}} gray>
                        Price
                      </Text>
                      <Text style={{fontSize: 15}}>
                        Rp.{element.pricePerSeat}/seat
                      </Text>
                    </PriceSection>
                    <View style={{flex: 1}}>
                      <ButtonSection>
                        {this.state.showTimeId !== null ? (
                          <Button
                            onPress={() => this.handleOrder(showTimesIndex)}
                            style={{paddingVertical: 10}}
                            variant="primary">
                            <Text white>Book now</Text>
                          </Button>
                        ) : (
                          <Button
                            style={{paddingVertical: 10}}
                            variant="primary">
                            <Text white>Book now</Text>
                          </Button>
                        )}
                        <Button style={{paddingVertical: 10}}>
                          <Text primary>Add to cart</Text>
                        </Button>
                      </ButtonSection>
                    </View>
                  </Card>
                );
              })
            ) : (
              <Text style={{marginTop: 20}} center>
                Can't find available showtimes
              </Text>
            )}
            {/* <Text style={{fontSize: 18, marginTop: 50}} center primary>
              view more
            </Text> */}
          </Container>
        </ShowtimeSection>
        <Footer />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movies.movie,
    showtimes: state.showtimes.results,
  };
};

const mapDispatchToProps = {
  getMovieById,
  getShowtimes,
  setLoading,
  selectTime,
  setOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

const styles = StyleSheet.create({
  Picker: {
    color: 'black',
  },
  MovieImage: {
    width: 120,
    height: 180,
    resizeMode: 'contain',
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
  margin-bottom: 12px;
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
