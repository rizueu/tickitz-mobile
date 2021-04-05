import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {REACT_APP_API_URL} from '@env';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import http from '../../Services';

import MenuBar from '../../Assets/Icons/nav-bars.png';
import PrimaryLogo from '../../Assets/Icons/Tickitz_Primary.png';

const Header = (props) => {
  const [avatarCollapse, setAvatarCollapse] = useState(false);
  const [picture, setPicture] = useState(null);

  const navigation = useNavigation();

  let decodedToken;

  if (props.token !== null) {
    decodedToken = jwt_decode(props.token);
  } else {
    decodedToken = null;
  }

  const avatarOnPress = () => {
    setAvatarCollapse((initial) => !initial);
  };

  React.useEffect(() => {
    const User = async () => {
      try {
        const {data} = await http.getUserDetail(props.token, decodedToken.id);
        setPicture(data.results.picture);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    User();
  }, [picture]);

  return (
    <Navbar>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={{resizeMode: 'contain', width: 120, height: 40}}
          source={PrimaryLogo}
        />
      </TouchableOpacity>
      {props.token ? (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}>
          <Avatar
            source={{
              uri: `${REACT_APP_API_URL}profile/${picture}`,
            }}
          />
        </TouchableWithoutFeedback>
      ) : props.auth ? null : (
        <Image source={MenuBar} style={{resizeMode: 'contain', width: 21}} />
      )}
      {/* {avatarCollapse && (
        <Collapse>
          <CollapseButton onPress={() => console.log('Profile Button')}>
            <Text>Profile</Text>
          </CollapseButton>
          <CollapseButton onPress={() => console.log('Logout Button')}>
            <Text>Logout</Text>
          </CollapseButton>
        </Collapse>
      )} */}
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
  background-color: #fff;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Collapse = styled.View`
  position: absolute;
  right: 0;
  top: 100;
  width: 150px;
  background-color: #fff;
  border-radius: 10px;
`;

const CollapseButton = styled.TouchableOpacity`
  padding: 20px;
`;
