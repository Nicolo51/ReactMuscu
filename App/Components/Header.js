import React from 'react'; 
import { View , Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Images from '../index/';

const WIDTH = Dimensions.get('window').width - 40;
const HEADER_HEIGHT = 50;


export class Header extends React.Component{

    render(){
        return ( 
            <View style={{backgroundColor: this.props.style.backgroundColor, flexDirection: 'row', height: HEADER_HEIGHT, justifyContent: 'space-between' }}>
                <Text style={{ color : this.props.style.color ,fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>{this.props.tabName}</Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={this.props.onButtonPress}>
                    <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10 }} source={Images.getImage(this.props.icoName)} />
                </TouchableOpacity>
            </View>
        )
    }
}
export default Header;
