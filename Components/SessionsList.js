import React from 'react';
import { View, ScrollView, Text, Dimensions, AsyncStorage, Image, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import DialogInput from 'react-native-dialog-input';

import PreviewTrain from './PreviewTrain.js'
import CustomButton from './CustomButton.js';
import TrainSession from './TrainSession.js';
import Header from './Header.js'; 
import StyleElements from './StyleElements.js'; 

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
        };
    }
    static navigationOptions = {
        title: 'Train Screen',
        headerStyle: {
            backgroundColor: "#E1E3DD",
            textAlign: 'center',
        },
        header: props =>
            <Header style={StyleElements.styles.Header}/>
    }

    componentDidMount() {
        this.loadSavedSessions();
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
                        const value = await AsyncStorage.getItem('TrainSessions');
                        if (value !== null) {
                            let sessions = JSON.parse(value);
                            sessions.splice(key, 1);
                            for(let i =0; i < sessions.length ; i++){
                                sessions[i].key = i;
                                console.log("Set to " + i );
                            }
                            this.setState({ TrainingSessions: sessions });
                            console.log("Set state perform");
                            const JSONstring = JSON.stringify(this.state.TrainingSessions);
                            await AsyncStorage.setItem('TrainSessions', JSONstring);
                            console.log(JSONstring + ": as been saved");
                        }
                    } catch (error) {
                        // Error retrieving datass
                    }
                }
            }

        ]);
    }

    saveSession = async (sessionName) => {
        try {
            let sessions = this.state.TrainingSessions;
            sessions.push({key: sessions.length, name: sessionName, Exercices: [] });
            this.setState({ TrainingSessions: sessions, IsAddSessionVisible: false });
            const JSONstring = JSON.stringify(this.state.TrainingSessions);
            await AsyncStorage.setItem('TrainSessions', JSONstring);
            console.log(JSONstring + ": as been saved");
        } catch (error) {
            // Error saving data
        }
    }

    loadSavedSessions = async () => {
        try {
            const value = await AsyncStorage.getItem('TrainSessions');
            if (value !== null) {
                console.log(value); 
                let sessions = JSON.parse(value);
                this.setState({ TrainingSessions: sessions,  })
            }
        } catch (error) {
            // Error retrieving datass
        }
    }

    render() {
        return (
                <ScrollView style={{ backgroundColor : '#fff1f1'}}> 
                    <DialogInput isDialogVisible={this.state.IsAddSessionVisible}
                        title={"Ajouter un entraînement"}
                        message={"Donnez un nom a votre entraînment : "}
                        hintInput={"Mon entraînement " + this.state.TrainingSessions.length}
                        submitInput={(inputText) => { this.saveSession(inputText) }}
                        closeDialog={() => { this.setState({ IsAddSessionVisible: false }) }} />

                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                        {this.state.TrainingSessions.map(session =>
                            <PreviewTrain name={ session.key + " : " + session.name } width={WIDTH / 2} onPress={() => navigateToScreen(this, 'TrainSession', {TrainingSessions: this.state.TrainingSessions, session: { name: session.name, Exercices: session.Exercices }} )} delete={() => this.deleteSession(session.key)} />
                        )}
                    </View>
                </ScrollView>
        )
    }
}

export default SessionsList; 