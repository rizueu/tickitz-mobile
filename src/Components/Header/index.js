import React, {Component} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/Feather';
import PrimaryLogo from '../../Assets/Icons/Tickitz_Primary.png';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar>
        <TouchableOpacity>
          <Image
            style={{resizeMode: 'contain', width: 120, height: 40}}
            source={PrimaryLogo}
          />
        </TouchableOpacity>
        {this.props.auth ? (
          <></>
        ) : (
          <TouchableWithoutFeedback>
            <Icon name="menu" size={24} />
          </TouchableWithoutFeedback>
        )}
      </Navbar>
    );
  }
}

const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
