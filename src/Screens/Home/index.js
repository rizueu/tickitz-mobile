import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

// Import Components
import {Button, Footer} from '../../Components';

import {useSelector, useDispatch} from 'react-redux';
import {getNowShowing, getUpComing} from '../../Redux/actions/movies';
import {setLoading} from '../../Redux/actions/main';

function Home(props) {
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.main.loading);
  const [selectedSeason, setSelectedSeason] = useState('September');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);
  const {nowShowingMovies, upComingMovies} = movies;

  React.useEffect(() => {
    if (!token) {
      navigation.navigate('SignUp');
    }
  }, [token, navigation]);

  React.useEffect(() => {
    dispatch(getNowShowing(moment().format('MMMM')));
    dispatch(getUpComing(selectedSeason));
  }, [selectedSeason, dispatch]);

  return (
    <ScrollView>
      <Container style={{backgroundColor: '#fff'}}>
        <View style={{marginTop: 30}}>
          <Text gray>Nearest Cinema, Newest Movie,</Text>
          <Text style={{fontSize: 35}} heavy primary>
            Find out now!
          </Text>
        </View>
        <View>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: null,
            }}
            source={require('../../Assets/Images/hero-background.png')}
          />
        </View>
      </Container>
      <NowShowingSection>
        <Container>
          <View style={{marginVertical: 45}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, marginBottom: 25}} heavy primary>
                Now Showing
              </Text>
              <Text style={{fontSize: 15}} primary>
                view all
              </Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {nowShowingMovies.map((e, index) => {
                return (
                  <NowShowingCard
                    onPress={() =>
                      navigation.navigate('MovieDetail', {
                        movieId: e.id,
                      })
                    }
                    key={String(index)}>
                    <MovieImage
                      source={{
                        uri: e.picture,
                      }}
                    />
                  </NowShowingCard>
                );
              })}
              {nowShowingMovies.length === 0 && <Text>There is no films.</Text>}
            </ScrollView>
          </View>
        </Container>
      </NowShowingSection>
      <Container>
        <View style={{marginVertical: 45}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20, marginBottom: 25}} heavy primary>
              Upcoming Movies
            </Text>
            <Text style={{fontSize: 15}} primary>
              view all
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[
              'September',
              'October',
              'November',
              'Desember',
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
            ].map((element, index) => {
              return (
                <View key={String(index)} style={styled.button}>
                  {element === selectedSeason ? (
                    <Button
                      onPress={() => {
                        dispatch(setLoading(false));
                      }}
                      style={styles.UpcomingButton}
                      variant="primary">
                      <Text white>{element}</Text>
                    </Button>
                  ) : (
                    <Button
                      onPress={() => {
                        dispatch(setLoading(true));
                        setSelectedSeason(element);
                        setTimeout(() => dispatch(setLoading(false)), 1000);
                      }}
                      style={styles.UpcomingButton}
                      variant="outlined-primary">
                      <Text primary>{element}</Text>
                    </Button>
                  )}
                </View>
              );
            })}
          </ScrollView>
          <ScrollView
            style={{marginVertical: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  width: Dimensions.get('window').width,
                }}>
                <ActivityIndicator size="small" color="#5F2EEA" />
              </View>
            ) : upComingMovies.length > 0 ? (
              upComingMovies.map((e, index) => {
                return (
                  <UpcomingCard key={String(index)}>
                    <MovieImage
                      source={{
                        uri: e.picture,
                      }}
                    />
                    <MovieDetail>
                      <Text style={{fontSize: 15, marginBottom: 5}} center>
                        {e.title}
                      </Text>
                      <Text style={{fontSize: 12}} center gray>
                        {e.genres}
                      </Text>
                    </MovieDetail>
                    <Button
                      onPress={() =>
                        navigation.navigate('MovieDetail', {
                          movieId: e.id,
                        })
                      }
                      style={{marginTop: 10, paddingVertical: 5}}
                      variant="outlined-primary">
                      <Text primary>Detail</Text>
                    </Button>
                  </UpcomingCard>
                );
              })
            ) : (
              <Text>There is no films.</Text>
            )}
          </ScrollView>
        </View>
        <View style={{marginVertical: 45}}>
          <View style={styles.MoviegoersCard}>
            <Text gray>Be the vanguard of the</Text>
            <Text style={{fontSize: 30}} heavy primary>
              Moviegoers
            </Text>
            <MoviegoersInput placeholder="Type your email" />
            <Button
              style={{paddingVertical: 10, marginTop: 10}}
              variant="primary">
              <Text white>Join now</Text>
            </Button>
            <Text style={{marginTop: 20}} center gray>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email .
            </Text>
          </View>
        </View>
      </Container>
      <Footer />
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  MoviegoersCard: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    padding: 50,
    borderRadius: 15,
  },
  card: {
    marginRight: 20,
  },
  UpcomingButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 110,
    marginRight: 10,
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

const NowShowingSection = styled.View`
  background-color: #d6d8e7;
`;

const NowShowingCard = styled.TouchableOpacity`
  border: solid #fff 1px;
  padding: 20px;
  margin-right: 20px;
  border-radius: 5px;
`;

const UpcomingCard = styled.View`
  border: solid #a0a3bd 0.5px;
  padding: 20px;
  margin-right: 20px;
  border-radius: 5px;
`;

const MovieImage = styled.Image`
  width: 120px;
  height: 180px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const MovieDetail = styled.View`
  width: 120px;
`;

const MoviegoersInput = styled.TextInput`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: solid gray 0.3px;
  height: 35px;
`;
