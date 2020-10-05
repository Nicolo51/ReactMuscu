import React from 'react';
import {Platform} from 'react-native';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Profile</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'orange',
  },
});
