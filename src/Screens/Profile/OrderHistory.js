// import all modules
import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

// import all components
import {Footer, OrderHistoryContent} from '../../Components';
import Hidden from '../../Components/Hidden';
import HiddenWrapper from '../../Components/HiddenWrapper';
import HeroGray from '../../Components/HeroGray';

export default function OrderHistory(props) {
  const toggle = useSelector((state) => state.main.toggle);
  return (
    <Fragment>
      <ScrollView>
        <HiddenWrapper>
          {toggle && <Hidden />}
          <HeroGray>
            <OrderHistoryContent />
          </HeroGray>
          <Footer />
        </HiddenWrapper>
      </ScrollView>
    </Fragment>
  );
}
