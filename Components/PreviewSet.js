import React from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Dimensions } from 'react-native';
import SetSuccess from './SetSuccess';
import CustomButton from './CustomButton';
import StyleElements from './StyleElements';
const HEADER_HEIGHT = 40;
import Images from '../index/';
import CountDown from 'react-native-countdown-component';
import ExoNote from './ExoNote.js';


//name = name display on top of the preview
//delete = called function when cross is pressed
//muscle = Text display next to 'Muscle :'
//restTime = nbrOfRep * 1 + timerToRest
//nbrRep = the number of little check box 
//image = background of the view 
//success = check list of the set
//... TBC

export class PreviewSession extends React.Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        parent = this.props.parent; 
        this.state = {
            success: this.props.success,
            session: this.props.session, 
            exerciceKey: this.props.exerciceKey, 
        }
        console.log("parent = " + this.props.parent)
    }

    SetDone = (value) => {
        console.log("id travaillé : " + this.state.exerciceKey);
        let success = this.state.session.Exercices[this.state.exerciceKey].success; 
        console.log( success.length )
        for(let i = 0; i < success.length; i++){
            if(success[i] == null){
                success[i] = value;
                break; 
            }
        }
        this.state.success = success; 
        console.log(success.length); 
        console.log(this.state.success.length);
        this.rebuildSession();
    }

    rebuildSession = () => {
        let session = this.state.session; 
        session.Exercices[this.state.exerciceKey].success = this.state.success; 
        this.setState({session: session, success: session.Exercices[this.state.exerciceKey].success}); 
        this.props.saveChanges(session);
    }

    renderTime = (timer) => {
        let leftOver = timer; 
        let hours = 0; let minutes = 0; let seconds = 0; 
        hours = Math.trunc(leftOver/3600); 
        leftOver = leftOver%3600; 
        minutes = Math.trunc(leftOver/60); 
        leftOver = leftOver%60; 
        seconds = leftOver;

        let output = ""; 
        if(hours > 0)
            output += hours +"h "; 
        if(minutes > 0)
            output += minutes +"m "; 
        if(seconds > 0)
            output += seconds +"s "; 

        return output; 
    }

    getColor = (boolValue) => {
        if(boolValue)
            return StyleElements.background.backgroundColor;
        return 'grey';
    }

    render() {
        return (
            <View style={styles.button}>
                <View style={{ flexDirection: 'row', height: HEADER_HEIGHT, backgroundColor: '#fff1f1', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20, textAlignVertical: 'center' }}> {this.props.name}</Text>
                    <TouchableOpacity style={{ width: 40 }} onPress={ this.props.delete }>
                        <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10, marginLeft: 10 }} source={Images.getImage('cross_ico')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{height: 100, width:  100, marginTop: 5, marginLeft: 5 }} onPress={() => navigateToScreen(parent, 'ExoNote', null )}>
                    <Image style={{ height: 100, width:  100}} source={Images.getImage('bibi')} />
                </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                         <Text style={{ marginTop: 5, marginLeft: 100}}>{this.props.sets} {" x "} {this.props.nbrRep} </Text>
                         <Text style={{ marginTop: 5, marginLeft: 115}}> {this.props.weith} {" Kg"} </Text>
                    </View>

                        
                        </View>


                <View style={{ flex: 1 }}>
                  
                    <ScrollView horizontal={true} style={{marginTop: 25, marginLeft: 110, flexDirection: 'row'}}>
                    {this.state.session.Exercices[this.state.exerciceKey].success.map( success => 
                        <SetSuccess isChecked={ success }/>
                        )}
                        
                    </ScrollView>
                </View>
                
            </View>

            
        )
    }

    
}

const styles = StyleSheet.create({
    button: {
        height: 150,
        borderWidth: 1,
        margin: 10,
    }
})

export default PreviewSession; 