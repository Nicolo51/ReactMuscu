import React from 'react'; 
import { View , Text, Image, TouchableOpacity } from 'react-native';


export class Header extends React.Component{

    render(){
        return ( 
            <View style={{ backgroundColor : this.props.style.backgroundColor, /*backgroundColor:"#d32f2f"*/ flexDirection: 'row', height: HEADER_HEIGHT, justifyContent: 'space-between' }}>
                <Text style={{ color : '#fff1f1',fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>Muscu APP</Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => self.addSession()}>
                    <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10 }} source={require('../ico/plus_ico.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}
export default Header;