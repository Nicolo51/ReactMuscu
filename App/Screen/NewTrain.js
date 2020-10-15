import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

class NewTrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TrainingName: '',
      OldTrain: [{key: 0, name: 'ERR', Exercices: []}],
    };
  }

  async componentDidMount() {
    await this.load().then(ans => {
      console.log('mount ans', ans);
      if (ans != null) {
        this.setState({OldTrain: JSON.parse(ans)});
      }
    });
  }

  async setObj(val) {
    console.log(this.state.OldTrain[0]);
    try {
      let Train;
      if (this.state.OldTrain[0].name === 'ERR') {
        console.log('ERR', val);
        this.setState({OldTrain: [{key: 0, name: val, Exercices: []}]});
        Train = [{key: 0, name: val, Exercices: []}];
      } else {
        this.state.OldTrain[this.state.OldTrain.length] = {
          key: this.state.OldTrain.length,
          name: val,
          Exercices: [],
        };
        Train = this.state.OldTrain;
      }
      console.log('create', Train);
      await AsyncStorage.setItem('TrainingSessions', JSON.stringify(Train));
    } catch (e) {
      console.log(e);
    }
    console.log('succes');
  }

  async load() {
    try {
      let Train = await AsyncStorage.getItem('TrainingSessions');
      return Train;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleZone}>
          <Text style={styles.title}>Créer un nouvelle Entrainement</Text>
        </View>
        <View style={styles.titleZone}>
          <Text style={styles.inputLabel}>Titre de l'entrainement</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({TrainingName: text})}
          />
          <Button
            color="orange"
            title="Creer"
            onPress={a => {
              this.setObj(this.state.TrainingName);
              this.props.navigation.navigate('Home');
              // navigateToScreen(this, 'SessionsList');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff1f1',
    alignItems: 'center',
  },
  titleZone: {
    paddingTop: '5%',
    width: '80%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 9,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: '20%',
  },
});
export default NewTrain;
