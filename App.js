import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SessionsList from './Components/SessionsList.js';
import TrainSession from './Components/TrainSession.js'; 

import { TouchableOpacity } from 'react-native-gesture-handler';
import { CreateSet } from './Components/CreateSet.js';


navigateToScreen = (app, screen, option) => {
  console.log(option);
  app.props.navigation.navigate(screen, option);
}

const AppNavigator = createStackNavigator({ //declare all the screen possible of the stack navigator 
  SessionsList: { screen: SessionsList }, // <Name to call>: { screen: <imported Component from above> } 
  TrainSession: { screen: TrainSession }, 
  CreateSet : { screen: CreateSet }, 
},
  {
    initialRouteName: 'SessionsList', // What screen the app start at
  });

export default createAppContainer(AppNavigator); // create the stack navigator
//ceci est un com