import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import StackNavigator from './StackNavigator.js';

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
          }}>
          <Tab.Screen name="Home" component={StackNavigator} />
          <Tab.Screen name="Graph" component={StackNavigator} />
          <Tab.Screen name="Add" component={StackNavigator} />
          <Tab.Screen name="Profile" component={StackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default TabNaviguator;
