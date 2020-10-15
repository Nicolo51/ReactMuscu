import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Profile',
      fetch: {},
    };
  }

  async load() {
    try {
      console.log('start load');
      let key = await AsyncStorage.getItem('TrainingSessions');
      return key;
    } catch (e) {
      console.log(e);
    }
    // console.log(this.state.text);
  }

  async rm() {
    try {
      console.log('rm');
      await AsyncStorage.clear();
    } catch (e) {}
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{this.state.text}</Text>
        <View style={styles.row}>
          <Button
            title="Test"
            color="orange"
            style={styles.button}
            onPress={a => {
              this.load().then(ans => {
                this.setState({fetch: ans});
                console.log(this.state.fetch);
              });
              // this.setState({text: this.load()});
              // console.log(this.state.text);
            }}
          />
          <Button title="remove" color="red" onPress={a => this.rm()} />
        </View>
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
  button: {},
  row: {
    width: '80%',
    borderRadius: 100,
  },
});
