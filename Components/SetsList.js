import React from 'react';
import { View, Text, TouchableOpacity, Image , AsyncStorage} from 'react-native';
import PreviewSet from './PreviewSet';

const HEADER_HEIGHT = 50; 

export class SetsList extends React.Component {
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
            <View style={{ flexDirection: 'row', height: HEADER_HEIGHT, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}> { self.props.navigation.state.params.session.name } </Text>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => self.onAddSessionPress()}>
                    <Image style={{ height: HEADER_HEIGHT - 20, width: HEADER_HEIGHT - 20, marginTop: 10 }} source={require('../ico/plus_ico.png')} />
                </TouchableOpacity>
            </View>
    }

    addSession = (name, muscle, numberOfRep, timer, image) => {
        console.log(name + " : " + muscle + " : " + numberOfRep + " : " + timer + " : " + image); 
        let session = this.state.session;  
        session.Exercices.push({key: this.state.session.Exercices.length, name: name, muscle: muscle, nbrRep: numberOfRep, restTime: timer, image: image}); 
        this.setState({session: session}); 
        this.saveChanges(); 
    }

    saveChanges = () => {
        let TrainingSessions = this.state.TrainingSessions; 
        let session = this.state.session; 
        TrainingSessions[session.key] = session; 
        Save("TrainingSessions", TrainingSessions);
    }

    onAddSessionPress = () => {
        navigateToScreen(this, 'CreateSet', { onGoBack: (name, muscle, numberOfRep, timer, image) => this.addSession(name, muscle, numberOfRep, timer, image) }); 
    }

    deleteSet = (key) => {
        let session = this.state.session;
        session.Exercices.splice(key, 1);
        for (let i = 0; i < session.Exercices.length; i++) {
            session.Exercices[i].key = i; 
        }
        this.setState({session: session});
        this.saveChanges(); 
    }
    render() {
        return (
            <View style={{ backgroundColor: '#e8582c', flex: 1 }}>
                {this.state.session.Exercices.map( set => 
                    <PreviewSet restTime={set.restTime} nbrRep={set.nbrRep} muscle={set.muscle} name={ set.key + " : " + set.name } delete={() => this.deleteSet(set.key) }/>
                    )}
            </View>
        )
    }
}

export default SetsList