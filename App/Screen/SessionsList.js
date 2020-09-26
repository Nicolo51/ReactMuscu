import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';

import PreviewSession from '../Components/PreviewSession.js';
import CustomButton from '../Components/CustomButton.js';
import SetsList from './SetsList.js';
import Header from '../Components/Header.js';
import StyleElements from '../Components/StyleElements.js';

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
    title: 'Training Screen',
    headerStyle: {
      backgroundColor: '#E1E3DD',
      textAlign: 'center',
    },
    header: props => (
      <Header
        icoName={'white_plus_ico'}
        onButtonPress={() => self.addSession()}
        tabName={'Session List Screen'}
        style={StyleElements.header}
      />
    ),
  };

  async componentDidMount() {
    if (this.state.loaded === true) return;
    let TrainingSessions = await Load('TrainingSessions');
    if (TrainingSessions == undefined) {
      return;
    }
    this.setState({TrainingSessions: TrainingSessions, loaded: true});
  }

  addSession = () => {
    this.setState({IsAddSessionVisible: true});
  };

  deleteSession = key => {
    Alert.alert('Confirmation', 'Are you sure ?', [
      {text: 'Cancel', onPress: () => console.log('Do nothing')},
      {
        text: 'OK',
        onPress: async () => {
          try {
            let TrainingSessions = this.state.TrainingSessions;
            TrainingSessions.splice(key, 1);
            for (let i = 0; i < TrainingSessions.length; i++) {
              TrainingSessions[i].key = i;
            }
            this.setState({TrainingSessions: TrainingSessions});
            Save('TrainingSessions', TrainingSessions);
          } catch (error) {
            console.log(
              'Something went wrong in deleteSession function : ' + error,
            );
          }
        },
      },
    ]);
  };

  saveSession = async sessionName => {
    try {
      let TrainingSessions = this.state.TrainingSessions;
      TrainingSessions.push({
        key: TrainingSessions.length,
        name: sessionName,
        Exercices: [],
      });
      this.setState({
        TrainingSessions: TrainingSessions,
        IsAddSessionVisible: false,
      });
      Save('TrainingSessions', TrainingSessions);
    } catch (error) {
      console.log('Something went wrong saveSession function : ' + error);
    }
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff1f1'}}>
        <DialogInput
          isDialogVisible={this.state.IsAddSessionVisible}
          title={'Ajouter un entraînement'}
          message={'Donnez un nom a votre entraînment : '}
          hintInput={'Mon entraînement ' + this.state.TrainingSessions.length}
          submitInput={inputText => {
            this.saveSession(inputText);
          }}
          closeDialog={() => {
            this.setState({IsAddSessionVisible: false});
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 10,
          }}>
          {this.state.TrainingSessions.map(session => (
            <PreviewSession
              name={session.key + ' : ' + session.name}
              width={WIDTH / 2}
              onPress={() =>
                navigateToScreen(this, 'SetsList', {
                  TrainingSessions: this.state.TrainingSessions,
                  session: {
                    key: session.key,
                    name: session.name,
                    Exercices: session.Exercices,
                  },
                })
              }
              delete={() => this.deleteSession(session.key)}
            />
          ))}
        </View>
        <CustomButton
          onPress={() => navigateToScreen(this, 'StatsExo', null)}
        />
      </ScrollView>
    );
  }
}

export default SessionsList;
