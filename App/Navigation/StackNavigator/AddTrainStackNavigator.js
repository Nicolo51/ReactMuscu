import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SetsList from '../../Screen/SetsList.js';

class AddTrainStackNaviguator extends React.Component {
  render() {
    const SessionListStack = createStackNavigator();
    return (
      <SessionListStack.Navigator>
        <SessionListStack.Screen name="SetList" component={SetsList} />
      </SessionListStack.Navigator>
    );
  }
}

export default AddTrainStackNaviguator;
