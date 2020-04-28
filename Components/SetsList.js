import React from 'react';
import { View, Text, TouchableOpacity, Image , AsyncStorage, StyleSheet, Vibration} from 'react-native';
import PreviewSet from './PreviewSet';
import Header from './Header.js';  
import StyleElements from './StyleElements.js';
import CustomButton from './CustomButton.js';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../index.js';
import DialogInput from 'react-native-dialog-input';
import CountDown from 'react-native-countdown-component';

export class SetsList extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            isFailVisible: false, 
            session: this.props.navigation.state.params.session,
            TrainingSessions: this.props.navigation.state.params.TrainingSessions,
            selectedSet: 0, 
        };

    }


    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#ffffff",
            textAlign: 'center',
        },
        header: props =>
            <Header icoName={"white_plus_ico"} onButtonPress={() => self.onAddSessionPress() } tabName={ "Set List Screen" } style={StyleElements.header}/>
    }

    addSession = (name, muscle, numberOfRep, timer, image) => {
        console.log(name + " : " + muscle + " : " + numberOfRep + " : " + timer + " : " + image); 
        let session = this.state.session;  
        let success =[];
        for(let i = 0; i < numberOfRep; i++)
        {
            success[i] = null; 
        } 
        session.Exercices.push({key: this.state.session.Exercices.length, name: name, muscle: muscle, nbrRep: numberOfRep, restTime: timer, image: image, success: success}); 
        this.setState({session: session}); 
        this.saveChanges(session); 
    }

    saveChanges = (s) => {
        let TrainingSessions = this.state.TrainingSessions; 
        let session = s;  
        TrainingSessions[session.key] = session; 
        Save("TrainingSessions", TrainingSessions);
    }

    onAddSessionPress = () => {
        navigateToScreen(this, 'CreateSet', { onGoBack: (name, muscle, numberOfRep, timer, image) => this.addSession(name, muscle, numberOfRep, timer, image) }); 
    }

    deleteSet = (key) => {
        console.log(key); 
        let session = this.state.session;
        session.Exercices.splice(key, 1);
        for (let i = 0; i < session.Exercices.length; i++) {
            session.Exercices[i].key = i; 
        }
        this.setState({session: session});
        this.saveChanges(session); 
    }

    selectSet = (key) => {
        console.log("change slected to id : " + key); 
        this.setState({selectedSet: key}); 
    }

    setDone = (value, keyExo) => {
        if(value == false){
            this.setState({isFailVisible: true})
            return; 
        }
        console.log("id travaillé : " + keyExo);
        let success = this.state.session.Exercices[keyExo].success; 
        console.log( success.length )
        for(let i = 0; i < success.length; i++){
            if(success[i] == null){
                success[i] = value;
                if(this.state.isFailVisible){; 
                    this.setState({isFailVisible: false})
                }
                break; 
            }
        }
        console.log(success.length); 
        this.rebuildSession(keyExo, success);
    }

    rebuildSession = (keyExo, success) => {
        let session = this.state.session; 
        session.Exercices[keyExo].success = success; 
        this.setState({session: session}); 
        this.saveChanges(session);
    }

    resetAllExo = () => {
        let session = this.state.session; 
        let exos = session.Exercices; 
        for (let i = 0 ; i < exos.length; i++){
            let success = exos[i].success; 
            for(let j = 0; j < success.length; j++){
                success[j] = null; 
            }
            exos[i].success = success; 
        }
        session.Exercices = exos; 
        this.setState({session: session});
        this.saveChanges(session);
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <DialogInput isDialogVisible={this.state.isFailVisible}
                        title={"Raté pour cette fois :("}
                        message={"Combien de rep avez vous réussi a faire ?"}
                        submitInput={(inputText) => { this.setDone(inputText, this.state.selectedSet) }}
                        closeDialog={() => { this.setState({ isFailVisible: false }) }} />
                <ScrollView style={{ backgroundColor: '#e8582c', flex: 1 }}>
                    {this.state.session.Exercices.map( set => 
                        <PreviewSet success={set.success} 
                        restTime={set.restTime} 
                        nbrRep={set.nbrRep} 
                        muscle={set.muscle} 
                        name={ set.key + " : " + set.name } 
                        session={this.state.session} 
                        exerciceKey={ set.key } 
                        isSelected={set.key === this.state.selectedSet}
                        saveChanges={(session) => this.saveChanges(session)} 
                        delete={() => this.deleteSet(set.key) }
                        onPress={() => this.selectSet(set.key)}/>
                        )}
                        <CustomButton text={'reset'} onPress={ () => this.resetAllExo()}/>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: 75 }}>
                    <View style={{flex: 2}}>
                    <CountDown
                            style={{marginTop: 5}}
                            size={25}
                            until={90}
                            onFinish={() => Vibration.vibrate(800)} 
                            digitStyle={{backgroundColor: '#d32f2f'}}
                            digitTxtStyle={{color: '#fff1f1'}}
                            timeLabelStyle={{color: 'red'}}
                            separatorStyle={{color: '#fff1f1'}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                        />
                    </View>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.setDone(true, this.state.selectedSet)}>
                        <Image style={{ height: 50, width: 50 }} source={Images.getImage('check_ico')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.setDone(false, this.state.selectedSet)}> 
                        <Image style={{ height: 50, width: 50,  }} source={Images.getImage('uncheck_ico')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default SetsList