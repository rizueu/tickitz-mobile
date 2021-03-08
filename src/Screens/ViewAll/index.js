import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

// import all components
import {Footer, ViewAll} from '../../Components';
import Hidden from '../../Components/Hidden';
import HiddenWrapper from '../../Components/HiddenWrapper';

function ViewAllScreen(props) {
  const toggle = useSelector((state) => state.main.toggle);

  return (
    <Fragment>
      <ScrollView>
        <HiddenWrapper>
          {toggle && <Hidden />}
          <ViewAll {...props} />
          <Footer />
        </HiddenWrapper>
      </ScrollView>
    </Fragment>
  );
}

export default ViewAllScreen;
