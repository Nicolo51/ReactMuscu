import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SetsList from '../../Screen/SetsList.js';
import NewTrain from '../../Screen/NewTrain.js';

class AddTrainStackNaviguator extends React.Component {
  render() {
    const SessionListStack = createStackNavigator();
    return (
      <SessionListStack.Navigator>
        <SessionListStack.Screen
          name="NewTrain"
          component={NewTrain}
          options={{headerShown: false}}
        />
        <SessionListStack.Screen
          name="SetsList"
          component={SetsList}
          options={{headerShown: false}}
        />
      </SessionListStack.Navigator>
    );
  }
}

export default AddTrainStackNaviguator;
