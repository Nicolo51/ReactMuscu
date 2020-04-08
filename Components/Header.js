import React from 'react'; 
import { View , Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width - 40;
const HEADER_HEIGHT = 50;

export class Header extends React.Component{

    render(){
        return ( 
            <View style={{ backgroundColor: this.props.style.backgroundColor  /*backgroundColor:"#d32f2f"*/ ,flexDirection: 'row', height: HEADER_HEIGHT, justifyContent: 'space-between' }}>
                <Text style={{ color : this.props.style.color ,fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>Muscu APP</Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.props.add}>
                    <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10 }} source={require('../ico/plus_ico.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}
export default Header;