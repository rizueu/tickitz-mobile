import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {Header} from '../Components';
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
  ViewAll,
} from '../Screens';

const Stack = createStackNavigator();

const router = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <React.Fragment>
          <Stack.Screen
            component={Home}
            name="Home"
            options={{
              header: () => <Header />,
            }}
          />
          <Stack.Screen
            component={SignUp}
            name="SignUp"
            options={{
              header: () => <Header auth />,
            }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Stack.Screen
            component={SignUp}
            name="SignUp"
            options={{
              header: () => <Header auth />,
            }}
          />
          <Stack.Screen
            component={Home}
            name="Home"
            options={{
              header: () => <Header />,
            }}
          />
        </React.Fragment>
      )}
      <Stack.Screen
        component={Forgot}
        name="Forgot"
        options={{
          header: () => <Header auth />,
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
        component={ViewAll}
        name="ViewAll"
        options={{
          header: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

export default router;
