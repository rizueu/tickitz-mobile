import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';

import persistedStore from './Redux/store';

PushNotification.createChannel(
  {
    channelId: 'general',
    channelName: 'General Notification',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

import linking from './linking';
import Router from './Router';

export default function App() {
  const {persistor, store} = persistedStore();

  React.useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer linking={linking}>
          <StatusBar barStyle="light-content" />
          <Router />
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
