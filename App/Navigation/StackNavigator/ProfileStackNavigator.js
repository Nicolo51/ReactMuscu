import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../../Screen/ProfileScreen.js';

class ProfileStackNavigator extends React.Component {
  render() {
    const SessionListStack = createStackNavigator();
    return (
      <SessionListStack.Navigator screenOptions={{headerShown: false}}>
        <SessionListStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </SessionListStack.Navigator>
    );
  }
}

export default ProfileStackNavigator;
