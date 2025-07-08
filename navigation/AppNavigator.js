import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../screens/LandingPage';
import CreateOrderPage from '../screens/CreateOrderPage';

import ConfirmOrder from '../screens/ConfirmOrder';
import UserInfo from '../screens/UserInfo';
import OrderStatus from '../screens/OrderStatus';
import Signup from '../screens/Signup';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="CreateOrder" component={CreateOrderPage} options={{ title: 'Create Order' }} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="OrderStatus" component={OrderStatus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
