import React, {Component} from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/FontAwesome5';
import PrimaryLogo from '../../Assets/Icons/Tickitz_Primary.png';
import {Ebv, Cineone, Hiflix} from '../../Assets/Images/Cinemas';

export default class index extends Component {
  render() {
    return (
      <Footer>
        <Image
          style={{resizeMode: 'contain', width: 140}}
          source={PrimaryLogo}
        />
        <Text gray>
          Stop waiting in line. Buy tickets{'\n'}conveniently, watch movies
          quietly.
        </Text>
        <Text style={{fontSize: 18, marginTop: 40}}>Explore</Text>
        <FooterItems>
          {['Cinemas', 'Movies List', 'Notification', 'My Ticket'].map(
            (element, index) => {
              return (
                <React.Fragment key={String(index)}>
                  <Text style={{marginRight: 11, fontSize: 15}} gray>
                    {element}
                  </Text>
                </React.Fragment>
              );
            },
          )}
        </FooterItems>
        <Text style={{fontSize: 18, marginTop: 40}}>Our Sponsor</Text>
        <FooterItems>
          {[Ebv, Cineone, Hiflix].map((element, index) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={String(index)}>
                <Image
                  style={{marginRight: 15, resizeMode: 'contain', width: 80}}
                  source={element}
                />
              </View>
            );
          })}
        </FooterItems>
        <Text style={{fontSize: 18, marginTop: 40}}>Follow Us</Text>
        <FooterItems>
          {['facebook-f', 'instagram', 'twitter', 'youtube'].map(
            (element, index) => {
              return (
                <React.Fragment key={String(index)}>
                  <Icon
                    style={{marginRight: 30}}
                    name={element}
                    size={20}
                    color="#6E7191"
                  />
                </React.Fragment>
              );
            },
          )}
        </FooterItems>
        <View style={{marginVertical: 50}}>
          <Text gray>© 2020 Tickitz. All Rights Reserved.</Text>
        </View>
      </Footer>
    );
  }
}

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

const Footer = styled.View`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const FooterItems = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
`;
