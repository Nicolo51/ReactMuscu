import React from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Dimensions } from 'react-native';
const HEADER_HEIGHT = 40;

export class PreviewTrain extends React.Component {

    render() {
        return (
                 <View style={{borderWidth:0}}> 
                   <TouchableOpacity style={[styles.button, { width: this.props.width }]} onPress={this.props.onPress}>
                 <View style={{flexDirection: 'row', height: HEADER_HEIGHT, backgroundColor: '#e2e3d8', justifyContent: 'space-between' }}>
                     <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20, textAlignVertical: 'center' }}> {this.props.name}</Text>
                     <TouchableOpacity style={{ width: 40 }} onPress={this.props.delete}>
                         <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10, marginLeft: 10 }} source={require('../ico/cross_ico.png')} />
                      </TouchableOpacity>
                 </View>
                         <View style={{borderWidth:0,flex: 1, backgroundColor: '#e2e3d8' }}>
                            <Text> - Exo 1 :  </Text>
                            <Text> - Exo 2 :  </Text>
                            <Text> - Exo 3 :  </Text> 
                            <Text> - Exo 4 :  </Text>
                            <Text> ...  </Text>
                         </View>
                     </TouchableOpacity>
                </View>

        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 150,
        borderWidth: 1,
        margin: 10,
    }
})

export default PreviewTrain; 