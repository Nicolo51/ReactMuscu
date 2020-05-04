import React from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Dimensions } from 'react-native';
import Header from './Header.js'; 
import Images from '../index.js';
import StyleElements from './StyleElements.js';


export class ExoNote extends React.Component {

    constructor(props) {
        super(props);
        self = this;  
    }
    static navigationOptions = {
        title: 'Train Screen',
        headerStyle: {
            backgroundColor: "#E1E3DD",
            textAlign: 'center',
        },
        header: props =>
        <Header icoName={"cross_ico"} onButtonPress={() => self.props.navigation.goBack()} tabName={ "Note 'Exo' " } style={StyleElements.header}/>

    }

        

        render() {

            return (
            
            <View>


            </View>


            )

                 
            
      }
}

export default ExoNote
        