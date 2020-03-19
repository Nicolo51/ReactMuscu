import React from 'react'; 
import { TextInput, View, StyleSheet } from 'react-native';

export class CustomTextInput extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={[ styles.viewTextInput, this.props.style ]}>
                <TextInput keyboardType={this.props.keyboardType} value={this.props.value} onBlur={this.props.onBlur} secureTextEntry={this.props.secureTextEntry} onChangeText={ this.props.onChangeText } style={ styles.textInput } placeholder={ this.props.placeholder } multiline={ this.props.multiline }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    textInput: {
        flex: 1, 
        fontSize: 20,  
    }, 
    viewTextInput: {
        borderColor: '#a6a6a6', 
        borderWidth: 2, 
        borderRadius: 10, 
        marginHorizontal: 15, 
    }
})

export default CustomTextInput; 