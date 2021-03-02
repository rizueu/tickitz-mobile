import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';

import persistedStore from './Redux/store';

const Stack = createStackNavigator();

import {Header} from './Components';
import {
  Home,
  SignUp,
  SignIn,
  Forgot,
  MovieDetail,
  Order,
  Payment,
  Ticket,
  Profile,
  OrderHistory,
} from './Screens';

export default function App() {
  const {persistor, store} = persistedStore();

  React.useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator>
            <Stack.Screen
              component={Home}
              name="Home"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={SignIn}
              name="SignIn"
              options={{
                header: () => <Header auth />,
              }}
            />
            <Stack.Screen
              component={Forgot}
              name="Forgot"
              options={{
                header: () => <Header auth />,
              }}
            />
            <Stack.Screen
              component={SignUp}
              name="SignUp"
              options={{
                header: () => <Header auth />,
              }}
            />
            <Stack.Screen
              component={MovieDetail}
              name="MovieDetail"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={Order}
              name="Order"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={Payment}
              name="Payment"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={Ticket}
              name="Ticket"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={Profile}
              name="Profile"
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen
              component={OrderHistory}
              name="OrderHistory"
              options={{
                header: () => <Header />,
              }}
            />
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
