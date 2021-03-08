import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

export default function SimpleCard(props) {
  return (
    <Fragment>
      <View style={[styled.card, props.style]}>{props.children}</View>
    </Fragment>
  );
}

const styled = StyleSheet.compose({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
