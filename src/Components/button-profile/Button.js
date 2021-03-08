import React, {Fragment} from 'react';

import {Warpper, Text} from './styles';

export default function Button(props) {
  return (
    <Fragment>
      <Warpper {...props}>
        <Text>{props.children}</Text>
      </Warpper>
    </Fragment>
  );
}
