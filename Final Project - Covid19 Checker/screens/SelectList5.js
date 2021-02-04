import React from 'react';
import Constants from 'expo-constants';
import {
  View,
  Text,
  Image,
  Button,
  AsyncStorage,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { SegmentedControls } from 'react-native-radio-buttons';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import ADVICES from '../data/texts';

export default class SelectList5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };
  }

  // Customize Header bar
  static navigationOptions = {
    title: 'Sintomas de Emergencia',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/002-ambulance.png')}
      />
    ),
  };

  //Calculate answer
  _calculateValue = () => {
    if (this.state.selectedOption == 'Si') {
      this.answer3 = 5;
    } else {
      this.answer3 = 0;
    }
  };

  //Store answer
  _storeAnswer3 = async () => {
    try {
      console.log('answer3 stored :' + this.answer3);
      await AsyncStorage.setItem('answer3', JSON.stringify(this.answer3));
      console.log(this.answer3);
    } catch (error) {
      console.log('error storing the answer3' + error);
    }
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const options = ['Si', 'No'];

    function setSelectedOption(selectedOption) {
      this.setState({ selectedOption });

      console.log('selected Options = ' + selectedOption);
    }

    return (
      <ScrollView style={styles.appContainer}>
        <GestureRecognizer
            onSwipeLeft={() => {
            this._calculateValue();
            this._storeAnswer3();
            this.props.navigation.navigate('Results');
          }}
          onSwipeRight={() => {
            this.props.navigation.navigate('SelectList4');
          }}
          config={config}>
          <Button
            title="Desliza hacia la izquierda para continuar"
                disabled={!this.state.selectedOption}
          />
          <View style={{ margin: 20 }}>
            <Text style={styles.title}> {ADVICES.data[15].description}</Text>
                        <Text style={styles.title}>{'\n'}</Text>
            <Text style={styles.title}> {ADVICES.data[9].description}</Text>
                        <Text style={styles.title}>{'\n'}</Text>
            <Text style={styles.title}> {ADVICES.data[10].description}</Text>
                        <Text style={styles.title}>{'\n'}</Text>
            <Text style={styles.title}> {ADVICES.data[11].description}</Text>
            <Text style={styles.title}>{'\n'}</Text>
            <SegmentedControls
              options={options}
              onSelection={setSelectedOption.bind(this)}
              selectedOption={this.state.selectedOption}
            />
          </View>
        </GestureRecognizer>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});
