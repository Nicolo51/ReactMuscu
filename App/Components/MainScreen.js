import React from 'react'; 
import { View, Text } from 'react-native'; 
import CustomButton from './CustomButton.js'

export class MainScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
        };
    }
    static navigationOptions = {
        title: 'Main Screen', 
        headerStyle: {
          backgroundColor: "#ffffff", 
          textAlign: 'center', 
        }
    }

    render () {
        return(
            <View>
                <CustomButton text={'S\'entrainer'} />
                <CustomButton text={'Configurer'} />
            </View>
        )
    }
}

export default MainScreen; 