import React from 'react'; 
import { View, Image} from 'react-native'; 

//isChecked = true: Green check | false : red cross | null : empty ico

export class SetSuccess extends React.Component{

    getImage = (value) => {
        if(value == null)
            return '../ico/empty_ico.png'
        if(value == false)
            return '../ico/uncheck_ico.png'
        if(value == true)    
            return '../ico/check_ico.png'
    }

    render() {
        return(
            <View>
                <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require("'../ico/check_ico.png")} /> 
            </View>
        )
    }

}

export default SetSuccess; 
