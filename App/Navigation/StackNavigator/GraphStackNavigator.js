import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SetsList from '../../Screen/SetsList.js';
import StatsExo from '../../Screen/StatsExo.js';
import ExoNote from '../../Screen/ExoNote.js';

class GraphStackNaviguator extends React.Component {
  render() {
    const SessionListStack = createStackNavigator();
    return (
      <SessionListStack.Navigator>
        <SessionListStack.Screen name="StatsExo" component={StatsExo} />
      </SessionListStack.Navigator>
    );
  }
}
export default GraphStackNaviguator;
