import React from 'react';
import { View, Text, TouchableOpacity, Image , AsyncStorage} from 'react-native';
import PreviewSession from './PreviewSession';
import Header from './Header.js'; 
import StyleElements from './StyleElements.js';

const HEADER_HEIGHT = 50; 

export class TrainSession extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            session: this.props.navigation.state.params.session,
            TrainingSessions: this.props.navigation.state.params.TrainingSessions,
            //IsAddSessionVisible: false,
        };

    }
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#ffffff",
            textAlign: 'center',
        },
        header: props =>
        <Header style={StyleElements.header}/>
    }

    addSession = (name, muscle, numberOfRep, timer, image) => {
        console.log(name + " : " + muscle + " : " + numberOfRep + " : " + timer + " : " + image); 
        let session = this.state.session;  
        session.Exercices.push({key: this.state.session.Exercices.length, name: name, muscle: muscle, numberOfRep: numberOfRep, time: timer, image: image}); 
        this.setState({session: session}); 
        let TrainingSessions = this.state.TrainingSessions; 
        TrainingSessions.session
        //TrainingSessions.se
    }

    saveChanges =  async() => {
        const JSONstring = JSON.stringify(TrainingSessions);
        await AsyncStorage.setItem('TrainSessions', JSONstring);
        console.log(JSONstring + ": as been saved");
    }

    onAddSessionPress = () => {
        navigateToScreen(this, 'CreateSet', { onGoBack: (name, muscle, numberOfRep, timer, image) => this.addSession(name, muscle, numberOfRep, timer, image) }); 
    }

    removeSet = async (key) => {
        let session = this.state.sesson;
        for (let i = 0; i < session.Exercices.length; i++) {
            if (session.Exercices[i].key == key) {
                session.Exercices.splice(i, 1);
                
                let TrainingSessions = this.state.TrainingSessions; 
                TrainingSessions[session.key] = session; 
                this.setState({ session: session, TrainingSessions: TrainingSessions });
                this.saveChanges(); 
            }
        }
    }


    render() {
        return (
            <View style={{  backgroundColor : StyleElements.background.backgroundColor, flex: 1 }}>
                { this.state.session.Exercices.map( set => 
                    <PreviewSession name={set.key + ": " + set.set} delete={() => this.removeSet(set.key)} />
                    )}
            </View>
        )
    }

}

export default TrainSession