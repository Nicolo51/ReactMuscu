import 'react-native-gesture-handler';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SessionsList from './Components/SessionsList.js';
import TrainingSessions from './Components/TrainingSessions.js'; 

import { TouchableOpacity } from 'react-native-gesture-handler';
import { CreateSet } from './Components/CreateSet.js';


navigateToScreen = (app, screen, option) => {
  console.log(option);
  app.props.navigation.navigate(screen, option);
}

Save = async (name, json) => {
    const JSONstring = JSON.stringify(json);
    await AsyncStorage.setItem(name, JSONstring);
    console.log(JSONstring + ": as been saved !"); 
}

Load = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
        console.log(value + "as been loaded !"); 
        let output = JSON.parse(value);
        return output;
    }
} catch (error) {
    console.log("Something went wrong : " + error);
}
}

const AppNavigator = createStackNavigator({ //declare all the screen possible of the stack navigator 
  SessionsList: { screen: SessionsList }, // <Name to call>: { screen: <imported Component from above> } 
  TrainingSessions: { screen: TrainingSessions }, 
  CreateSet : { screen: CreateSet }, 
},
  {
    initialRouteName: 'SessionsList', // What screen the app start at
  });

export default createAppContainer(AppNavigator); // create the stack navigator