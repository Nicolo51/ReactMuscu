import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SessionsList from '../Screen/SessionsList.js';
import SetsList from '../Screen/SetsList.js';
import StatsExo from '../Screen/StatsExo.js';
import ExoNote from '../Screen/ExoNote.js';

class StackNaviguator extends React.Component {
  render() {
    const SessionListStack = createStackNavigator();
    return (
      <SessionListStack.Navigator>
        <SessionListStack.Screen name="SessionsList" component={SessionsList} />
      </SessionListStack.Navigator>
    );
  }
  //   render() {
  //     const HomeStack = createStackNavigator();
  //     return (
  //       <NavigationContainer>
  //         <Stack.Navigator screenOptions={{headerShown: false}}>
  //           <Stack.Screen name="SessionsList" component={SessionsList} />
  //           <Stack.Screen name="SetsList" component={SetsList} />
  //           <Stack.Screen name="StatsExo" component={StatsExo} />
  //           <Stack.Screen name="ExoNote" component={ExoNote} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     );
  //   }
}

export default StackNaviguator;
