import React, {Fragment} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

// import all components
import {Footer, ProfileHeader} from '../../Components';
import Hidden from '../../Components/Hidden';
import HiddenWrapper from '../../Components/HiddenWrapper';
import HeroGray from '../../Components/HeroGray';
import AccountSettings from '../../Components/AccountSettings';

export default function DetailsAccount(props) {
  const toggle = useSelector((state) => state.home.toggle);
  return (
    <Fragment>
      <ScrollView>
        <HiddenWrapper style={style.hero}>
          {toggle && <Hidden />}
          <HeroGray>
            <ProfileHeader {...props} />
            <AccountSettings {...props} />
          </HeroGray>
          <Footer />
        </HiddenWrapper>
      </ScrollView>
    </Fragment>
  );
}

const style = StyleSheet.create({
  hero: 100,
});
