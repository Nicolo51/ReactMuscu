import React from 'react';
import {
  Dimensions,
  Alert,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-community/async-storage'

import PreviewSession from '../Components/PreviewSession.js';
import CustomButton from '../Components/CustomButton.js';
import Header from '../Components/Header.js';
import StyleElements from '../Components/StyleElements.js';
import {Button} from 'react-native';

const WIDTH = Dimensions.get('window').width - 40;
const HEADER_HEIGHT = 50;
let self = null;

export class SessionsList extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      TrainingSessions: {},
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
    // let TrainingSessions = await AsyncStorage.getItem('TrainingSessions');
    await this.load().then(ans => {
      if (ans === null) {
        this.setState({
          TrainingSessions: [{key: 0, name: 'tete', Exercices: []}],
        });
      } else if (ans === undefined) {
        return;
      } else {
        this.setState({TrainingSessions: JSON.parse(ans)});
      }
    });

    this.setState({/*TrainingSessions: TrainingSessions,*/ loaded: true});
  }

  async load() {
    try {
      console.log('start load');
      let key = await AsyncStorage.getItem('TrainingSessions');
      return key;
    } catch (e) {
      console.log(e);
    }
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
    // AsyncStorage.clear();
    console.log(this.state.TrainingSessions);
    return (
      <SafeAreaView style={styles.container}>
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
        <FlatList
          data={this.state.TrainingSessions}
          keyExtractor={item => item.key}
          inverted={true}
          refreshing={! this.state.loaded}
          onRefresh={() => {
            this.setState({loaded: false}),
            this.load().then(ans => {
              this.setState({TrainingSessions: JSON.parse(ans)})
            })
            this.setState({loaded: true}) 
          }}
          renderItem={({item}) => (
            <PreviewSession
              name={item.key + ' : ' + item.name}
              width={WIDTH / 2}
              onPress={() =>
                this.props.navigation.navigate('Add', {
                  screen: 'SetsList',
                  params: {
                    TrainingSessions: item, //this.state.TrainingSessions,
                    session: {
                      key: item.key, //this.state.TrainingSessions.key,
                      name: item.name, //this.state.TrainingSessions.name,
                      Exercices: item.Exercices, // this.state.TrainingSessions.Exercices,
                    },
                  },
                })
              }
              delete={() => this.deleteSession(item.key)}
            />
          )}
          numColumns={2}
        />
          <CustomButton
            onPress={() => navigateToScreen(this, 'StatsExo', null)}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff1f1',
    flex: 1,
    // flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  view:{
    flexDirection:'row',
  }
  // view: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   paddingTop: 10,
  // },
});

export default SessionsList;
