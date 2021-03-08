import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

const HeroGray = (props) => {
  return (
    <Fragment>
      <View style={styled.hero}>{props.children}</View>
    </Fragment>
  );
};

export default HeroGray;

const styled = StyleSheet.compose({
  hero: {
    backgroundColor: '#F7F7FC',
    paddingVertical: 30,
    position: 'relative',
  },
});
