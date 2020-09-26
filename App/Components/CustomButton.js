import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'; 

export class CustomButton extends React.Component{
    render(){
        return (
            <TouchableOpacity style={ [styles.button, this.props.style] } onPress={ this.props.onPress }> 
                <Text style={[ this.props.fontSize , { color: 'black' }]} > {this.props.text} </Text>
            </TouchableOpacity>
        )
    }
} 

const styles = StyleSheet.create({
    button:{
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        margin: 20, 
        backgroundColor: '#edd5c5', 
        borderRadius: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})

export default CustomButton; 
