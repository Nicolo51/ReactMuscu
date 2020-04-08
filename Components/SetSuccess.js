import React from 'react'; 
import { View, Image} from 'react-native'; 
import Images from '../index/';

//isChecked = true: Green check | false : red cross | null : empty ico

export class SetSuccess extends React.Component{
    
    constructor(props) {
        super();
    }
    /*getImage = (value) => {
        if(value == null)
            return Images.empty_ico;
        if(value == false)
            return Images.uncheck_ico;
        if(value == true)    
            return Images.check_ico;
    }
    */
   
    render() {
        return(
            <View>
                <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={Images.getImage(this.props.isChecked)} /> 
            </View>
        )
    }

}

export default SetSuccess; 
