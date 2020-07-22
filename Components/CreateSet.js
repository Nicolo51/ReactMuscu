import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import CustomTextInput from './CustomTextInput';
import { Dropdown } from 'react-native-material-dropdown';
import CustomButton from './CustomButton';

export class CreateSet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            muscle: '', 
            weith: '',
            sets: '',  // Set = séries 
            numberOfRep: 1,
            timer: 60, 
            minutes: 1, 
            seconds: 0, 
            image: '', 
        };

    }
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#ffffff",
            textAlign: 'center',
        }
    }
    onChangeTextName = (text) => {
        this.setState({name: text}); 
    } 

    onMinusPress = () => {
        let numberOfRep = this.state.numberOfRep;
        numberOfRep--; 
        if( numberOfRep < 1 )
            return;
        this.setState({numberOfRep: numberOfRep});  
    }

    onPlusPress = () => {
        let numberOfRep = this.state.numberOfRep;
        numberOfRep++; 
        this.setState({numberOfRep: numberOfRep}); 
    }

    onChangeTextNumberOfRep = (text) => {
        let nbr = text; 
        this.setState({numberOfRep: nbr});
    }

    onChangeTextMuscle = (text) => {
        this.setState({muscle: text});
    }

    onChangeTextSets = (text) => {
        this.setState({sets: text});
    }


    onChangeTextWeith = (text) => {
        this.setState({weith: text});
    }

    checkNumber = () =>{
        let nbr = parseInt(this.state.numberOfRep); 
        if( nbr.toString() == "NaN" ){
            this.setState({numberOfRep: 1}); 
        }else{
            if(nbr < 1 ){
                nbr = 1;
            } 
            this.setState({numberOfRep: nbr}); 
        }
    }

    createSet = () => {
        console.log("create"); 
        this.props.navigation.state.params.onGoBack(this.state.name, this.state.muscle, this.state.numberOfRep, this.state.timer, this.state.image, this.state.weith, this.state.sets); 
        this.props.navigation.goBack();
    }

    changeTextSeconds= (text) =>{
        let Seconds = parseInt(text); 
        this.setState({timer: (this.state.minutes * 60 + Seconds), seconds: Seconds})
        console.log('timer set a ' + this.state.timer);
    }


    changeTextMinutes= (text) =>{
        let Minutes = parseInt(text); 
        this.setState({timer: (Minutes * 60 + this.state.seconds), minutes: Minutes})
        console.log('timer set a ' + this.state.timer);
    }

    render() {
        return(
        <View> 
             <View style={styles.center}>
                 <Text> Exercice : </Text>
                <CustomTextInput  style={ styles.textInput } value={ this.state.name } onChangeText ={(text) => this.onChangeTextName(text)}></CustomTextInput>
            </View>
            <View style={ styles.center }>
                 <Text> Muscle : </Text>
                <CustomTextInput style={ styles.textInput } value={ this.state.muscle } onChangeText={(text) => this.onChangeTextMuscle(text)}></CustomTextInput>
            </View>
            <View style={ styles.center }>
                 <Text> Nomber of set :  </Text>
                <CustomTextInput keyboardType={'numeric'} style={{ marginTop: 15,marginRight: 70, width:80, height: 50}} value={ this.state.sets} onChangeText={(text) => this.onChangeTextSets(text)}></CustomTextInput>
            </View>
            <View style={ styles.center }>
                <Text> Number of reps : </Text>
                <CustomTextInput keyboardType={'numeric'} style={{ marginTop: 15,marginRight: 75, width:80, height: 50}} value={ this.state.numberOfRep } onChangeText={(text) => this.onChangeTextNumberOfRep(text)}></CustomTextInput>
            </View>
            <View style={ styles.center }>
                 <Text> Weith (Kg): </Text>
                <CustomTextInput keyboardType={'numeric'} style={{ marginTop: 15,marginRight: 40, width:80, height: 50}} value={ this.state.weith } onChangeText={(text) => this.onChangeTextWeith(text)}></CustomTextInput>
            </View>
           
            <View style={ styles.center }>
                <Text style={{marginTop: 30, marginRight: 10}}>Recover : </Text>
                <View style={{ flex: 1 }}>
                    <Dropdown onChangeText={(value, index, data) => this.changeTextMinutes(value)} label={'Minutes'} value={1} data={[{value:0}, {value:1}, {value:2}, {value:3}, {value:4}, {value:5}, {value:6}, {value:7}]}/>
                </View>
                <View style={{ flex: 1 }}>
                    <Dropdown onChangeText={(value, index, data) => this.changeTextSeconds(value)} label={'Secondes'} value={0} data={[{value:0}, {value:10}, {value:20}, {value:30}, {value:40}, {value:50}]}/>
                </View>
            </View>
            <CustomButton text="Ajouter" onPress={() => this.createSet()}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    numberRef:{
        width: 50,
        height: 50, 
        marginTop: 20, 
        marginHorizontal: -10, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10
    }, 
    textInput:{
        height:50, 
        marginTop: 10,
        flex:1
    }
    
})

export default CreateSet; 