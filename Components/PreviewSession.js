import React from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Dimensions } from 'react-native';
const HEADER_HEIGHT = 40;

export class PreviewSession extends React.Component {

    render() {
        return (
            <View style={styles.button} >
                <View style={{ flexDirection: 'row', height: HEADER_HEIGHT, backgroundColor: 'white', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20, textAlignVertical: 'center' }}> {this.props.name}</Text>
                    <TouchableOpacity style={{ width: 40 }} onPress={this.props.delete}>
                        <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10, marginLeft: 10 }} source={require('../ico/cross_ico.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: 'green' }}>
                    <Text style={{ marginTop: 10, marginLeft: 5 }}>- Nombre d'exos : </Text>
                    <Text style={{ marginTop: 10, marginLeft: 5 }}>- Temps : </Text>
                </View>
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

export default PreviewSession; 