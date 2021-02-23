import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, FlatList} from 'react-native';
import styled from 'styled-components';

// Import Assets
import spiderMan from '../../Assets/Images/Movies/spiderMan.png';

// Import Components
import {Button, Footer} from '../../Components';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: '',
    };
  }
  render() {
    let {selectedSeason} = this.state;
    return (
      <ScrollView>
        <Container>
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
              <Text style={{fontSize: 20, marginBottom: 25}} heavy primary>
                Now Showing
              </Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {[1, 2, 3].map((e, index) => {
                  return (
                    <NowShowingCard key={String(index)}>
                      <MovieImage source={spiderMan} />
                    </NowShowingCard>
                  );
                })}
              </ScrollView>
            </View>
          </Container>
        </NowShowingSection>
        <Container>
          <View style={{marginVertical: 45}}>
            <Text style={{fontSize: 20, marginBottom: 25}} heavy primary>
              Upcoming Movies
            </Text>
            {/* <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
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
              ].map((element) => {
                return (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({selectedSeason: element});
                    }}
                    variant={
                      selectedSeason === element
                        ? 'primary'
                        : 'outlined-primary'
                    }
                    className="mr-2 py-2">
                    {selectedSeason === element ? (
                      <Text white>{element}</Text>
                    ) : (
                      <Text primary>{element}</Text>
                    )}
                  </Button>
                );
              })}
            </ScrollView> */}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {[1, 2, 3].map((e, index) => {
                return (
                  <UpcomingCard key={String(index)}>
                    <MovieImage source={spiderMan} />
                    <MovieDetail>
                      <Text style={{fontSize: 15, marginBottom: 5}} center>
                        Spider-Man: Homecoming
                      </Text>
                      <Text style={{fontSize: 12}} center gray>
                        Action, Sci-Fi, Fantasy
                      </Text>
                    </MovieDetail>
                    <Button
                      onPress={() =>
                        this.props.navigation.navigate('MovieDetail')
                      }
                      style={{marginTop: 10, paddingVertical: 5}}
                      variant="outlined-primary">
                      <Text primary>Detail</Text>
                    </Button>
                  </UpcomingCard>
                );
              })}
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
}

const styles = StyleSheet.create({
  MoviegoersCard: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    padding: 50,
    borderRadius: 15,
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

const NowShowingCard = styled.View`
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
