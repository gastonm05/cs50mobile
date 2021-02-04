import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import QUESTIONS from '../data/texts';

export default class SelectList4 extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: '',
      selectedOption2: '',
    };
  }
  // Customize Header bar
  static navigationOptions = {
    title: 'Geo Localización',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/019-calendar.png')}
      />
    ),
  };

  //Calculate answer
  _calculateAnswer1 = () => {
    if (this.state.selectedOption == 'Si') {
      this.answer1 = 5;
    } else {
      this.answer1 = 0;
    }
  };
  //TO-DO reuse the method for all calculations
  _calculateAnswer2 = () => {
    if (this.state.selectedOption == 'Si') {
      this.answer2 = 5;
    } else {
      this.answer2 = 0;
    }
  };
  //Store answer1
  _storeAnswer1 = async () => {
    try {
      console.log('answer1 stored :' + this.answer1);
      await AsyncStorage.setItem('answer1', JSON.stringify(this.answer1));
      console.log(this.answer1);
    } catch (error) {
      console.log('error storing the answer2' + error);
    }
  };
  //TO-DO reuse the method for all calculations
  //Store answer
  _storeAnswer2 = async () => {
    try {
      console.log('answer2 stored :' + this.answer2);
      await AsyncStorage.setItem('answer2', JSON.stringify(this.answer2));
      console.log(this.answer2);
    } catch (error) {
      console.log('error storing the answer2' + error);
    }
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    const { selectedIndex, selectedIndex2 } = this.state;

    const options = ['Si', 'No'];

    function setSelectedOption(selectedOption) {
      this.setState({ selectedOption });
    }

    function setSelectedOption2(selectedOption2) {
      this.setState({ selectedOption2 });
    }
    return (
     <ScrollView style={styles.appContainer}>
        <GestureRecognizer
          onSwipeLeft={() => {
            this._calculateAnswer1();
            this._calculateAnswer2();
            this._storeAnswer1();
            this._storeAnswer2();
            this.props.navigation.navigate('SelectList5');
          }}
          onSwipeRight={() => {
            this.props.navigation.navigate('SelectList3');
          }}
          config={config}>
          <Button
            title="Desliza hacia la izquierda para continuar"
            disabled={!this.state.selectedOption || !this.state.selectedOption2}
          />
          <Text style={styles.headerText}>
            <Text style={styles.title}>{'\n'}</Text>
            <Text style={styles.title}> {QUESTIONS.data[13].description}</Text>
            <Text style={styles.title}>{'\n'}</Text>
          </Text>
          <SegmentedControls
            options={options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
          />
          <View style={styles.Seperator} />
          <Text style={styles.headerText}>
            <Text style={styles.title}>{'\n'}</Text>
            <Text style={styles.title}> {QUESTIONS.data[14].description}</Text>
            <Text style={styles.title}>{'\n'}</Text>
          </Text>
          <SegmentedControls
            options={options}
            onSelection={setSelectedOption2.bind(this)}
            selectedOption={this.state.selectedOption2}
          />
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
  headerText: {
    padding: 8,
    //   fontSize: 14,
    color: '#444444',
    textAlign: 'center',
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    marginTop: 24,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});
