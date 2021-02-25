import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/Feather';
import PrimaryLogo from '../../Assets/Icons/Tickitz_Primary.png';

const Header = (props) => {
  const navigation = useNavigation();

  return (
    <Navbar>
      <TouchableOpacity>
        <Image
          style={{resizeMode: 'contain', width: 120, height: 40}}
          source={PrimaryLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {!props.token ? (
          <Avatar
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        ) : (
          <Icon name="menu" size={24} />
        )}
      </TouchableOpacity>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Header);

const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
