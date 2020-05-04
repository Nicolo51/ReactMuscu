import React from 'react'; 
import { View, Image, Text} from 'react-native'; 
import Images from '../index/';

//isChecked = true: Green check | false : red cross | null : empty ico

export class SetSuccess extends React.Component{
    
    constructor(props) {
        super();
    }
    
   renderNumber = (value) => {
       if(value < 10){
        return (<Text style={{color: 'red', marginTop: -22, marginLeft:1 , fontWeight: 'bold', fontSize: 17}}> { value }</Text>)
       }
       if (value < 100){
        return (<Text style={{color: 'red', marginTop: -20, marginLeft:-2 , fontWeight: 'bold', fontSize: 14}}> { value }</Text>)
       }
       else{
        return(<Image style={{ height: 20, width: 50, marginTop: -20 }} source={Images.getImage(false)}/>)
       }
   }
   renderFailOrSuccess = (value) => {
       if(value == parseInt(value, 10)){
           return (<View style={{height: 20, width:50, marginLeft: 1 }}>
               <Image style={{ height: 20, width: 50}} source={Images.getImage(null)}/>
               {this.renderNumber(value)}
           </View>)

       }
       else {
           return (<Image style={{ height: 20, width: 50, marginLeft: 1 }} source={Images.getImage(value)}/>)
       }

   } 
    render() {
        return(
            <View>
                {this.renderFailOrSuccess(this.props.isChecked)}
            </View>
        )
    }

}

export default SetSuccess; 