import React from 'react';
import { View, ScrollView, Text, Dimensions, AsyncStorage, Image, TouchableOpacity, Alert } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import PreviewTrain from './PreviewTrain.js'
import CustomButton from './CustomButton.js';
import TrainingSessions from './TrainingSessions.js';

const WIDTH = Dimensions.get('window').width - 40;
const HEADER_HEIGHT = 50;
let self = null;


export class SessionsList extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            TrainingSessions: [],
            IsAddSessionVisible: false,
            loaded: false,
        };
    }
    static navigationOptions = {
        title: 'Train Screen',
        headerStyle: {
            backgroundColor: "#ffffff",
            textAlign: 'center',
        },
        header: props =>
            <View style={{ flexDirection: 'row', height: HEADER_HEIGHT, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>Muscu APP</Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => self.addSession()}>
                    <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10 }} source={require('../ico/plus_ico.png')} />
                </TouchableOpacity>
            </View>
    }

    async componentDidMount() {
        if(this.state.loaded === true)
            return; 
        let TrainingSessions = await Load('TrainingSessions'); 
        if(TrainingSessions == undefined){
            return;
        }
        this.setState({TrainingSessions: TrainingSessions, loaded: true});
    }

    addSession = () => {
        this.setState({ IsAddSessionVisible: true });
    }

    deleteSession = (key) => {
        Alert.alert("Confirmation", "Are you sure ?", [
            { text: "Cancel", onPress: () => console.log("Do nothing") },
            {
                text: "OK", onPress: async () => {
                    try {
                        let TrainingSessions = this.state.TrainingSessions; 
                        TrainingSessions.splice(key, 1);
                        for(let i = 0; i < TrainingSessions.length ; i++){
                            TrainingSessions[i].key = i;
                        }
                        this.setState({ TrainingSessions: TrainingSessions });
                        Save("TrainingSessions", TrainingSessions); 
                    } catch (error) {
                        console.log("Something went wrong in deleteSession function : " + error); 
                    }
                }
            }
        ]);
    }

    saveSession = async (sessionName) => {
        try {
            let TrainingSessions = this.state.TrainingSessions;
            TrainingSessions.push({key: TrainingSessions.length, name: sessionName, Exercices: [] });
            this.setState({ TrainingSessions: TrainingSessions, IsAddSessionVisible: false });
            Save('TrainingSessions', TrainingSessions); 
        } catch (error) {
            console.log("Something went wrong saveSession function : " + error );
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#e8582c' }}>
                <DialogInput isDialogVisible={this.state.IsAddSessionVisible}
                    title={"Ajouter un entraînement"}
                    message={"Donnez un nom a votre entraînment : "}
                    hintInput={"Mon entraînement " + this.state.TrainingSessions.length}
                    submitInput={(inputText) => { this.saveSession(inputText) }}
                    closeDialog={() => { this.setState({ IsAddSessionVisible: false }) }} />

                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                    {this.state.TrainingSessions.map(session =>
                        <PreviewTrain name={ session.key + " : " + session.name } width={WIDTH / 2} onPress={() => navigateToScreen(this, 'TrainingSessions', {TrainingSessions: this.state.TrainingSessions, session: { name: session.name, Exercices: session.Exercices }} )} delete={() => this.deleteSession(session.key)} />
                    )}
                </View>
            </ScrollView>
        )
    }
}

export default SessionsList; 