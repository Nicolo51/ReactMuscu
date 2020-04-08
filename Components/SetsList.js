import React from 'react';
import { View, Text, TouchableOpacity, Image , AsyncStorage} from 'react-native';
import PreviewSet from './PreviewSet';
import Header from './Header.js'; 
import StyleElements from './StyleElements.js';

const HEADER_HEIGHT = 50; 

export class SetsList extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            session: this.props.navigation.state.params.session,
            TrainingSessions: this.props.navigation.state.params.TrainingSessions,
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
        console.log("refj " + s);
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
    render() {
        return (
            <View style={{ backgroundColor: '#e8582c', flex: 1 }}>
                {this.state.session.Exercices.map( set => 
                    <PreviewSet success={set.success} restTime={set.restTime} nbrRep={set.nbrRep} muscle={set.muscle} name={ set.key + " : " + set.name } session={this.state.session} exerciceKey={ set.key } saveChanges={(session) => this.saveChanges(session)} delete={() => this.deleteSet(set.key) }/>
                    )}
            </View>
        )
    }
}

export default SetsList