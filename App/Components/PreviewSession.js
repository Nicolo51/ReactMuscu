import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import images from '../..';
const HEADER_HEIGHT = 40;
import Images from '../../index.js';

export class PreviewSet extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, {width: this.props.width}]}
        onPress={this.props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            height: HEADER_HEIGHT,
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 20,
              textAlignVertical: 'center',
            }}>
            {' '}
            {this.props.name}
          </Text>
          <TouchableOpacity style={{width: 40}} onPress={this.props.delete}>
            <Image
              style={{
                height: HEADER_HEIGHT - 20,
                width: HEADER_HEIGHT - 20,
                marginTop: 10,
                marginLeft: 10,
              }}
              source={Images.getImage('cross_ico')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: 'green'}} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 150,
    borderWidth: 1,
    margin: 10,
  },
});

export default PreviewSet;
