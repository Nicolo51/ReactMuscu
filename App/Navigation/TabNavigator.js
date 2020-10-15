import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from './StackNavigator/HomeStackNavigator.js';
import ProfileStackNavigator from './StackNavigator/ProfileStackNavigator.js';
import GraphStackNavigator from './StackNavigator/GraphStackNavigator.js';
import AddTrainStackNavigator from './StackNavigator/AddTrainStackNavigator.js';

class TabNaviguator extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name === 'Add') {
                iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
              } else if (route.name === 'Graph') {
                iconName = focused
                  ? 'trending-up-sharp'
                  : 'trending-up-outline';
              } else {
                iconName = focused ? 'person-sharp' : 'person-outline';
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'orange',
            inactiveTintColor: 'black',
            showLabel: false,
          }}>
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Graph" component={GraphStackNavigator} />
          <Tab.Screen name="Add" component={AddTrainStackNavigator} />
          <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default TabNaviguator;
