import React from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Dimensions, TextInput } from 'react-native';
import Header from './Header.js'; 
import Images from '../index.js';
import StyleElements from './StyleElements.js';
import CustomButton from './CustomButton.js';


export class ExoNote extends React.Component {

    constructor(props) {
        super(props);
        self = this;  
    }
    static navigationOptions = {
        title: 'ExoNote',
        headerStyle: {
            backgroundColor: "#E1E3DD",
            textAlign: 'center',
        },
        header: props =>
        <Header icoName={"white_arrow"} onButtonPress={() => self.props.navigation.goBack()} tabName={ "Note 'Exo' " } style={StyleElements.header}/>

    }

        

        render() {

            return (
            
            <ScrollView vertical={true} style={{flex: 1, flexDirection: "column"}}>
                <Image style={{ height: 300, width:  250, marginLeft: 50, marginTop: 5}} source={Images.getImage('bibi')} />
                    <View style={{height: 250, width:  300, marginTop: 10, marginLeft:25}}>
                         <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Some notes for This set bro ?"
                                placeholderTextColor="grey"
                                numberOfLines={20}
                                multiline={true}
                                />
                            </View>
            </ScrollView>


            )

                 
            
      }
}

export default ExoNote
        