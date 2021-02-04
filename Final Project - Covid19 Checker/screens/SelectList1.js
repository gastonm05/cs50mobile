import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  AsyncStorage,
  StyleSheet,
  ScrollView,
} from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import SelectMultiple from 'react-native-select-multiple';
import Symptoms from '../data/symptoms1';

export default class SelectList1 extends React.Component {
  state = { selectedSintomas: [] };

  onSelectionsChange = (selectedSintomas) => {
    // selectedSintomas is array of { label, value }
    this.setState({ selectedSintomas });
    console.log(selectedSintomas);
  };

  // Customize Header bar
  static navigationOptions = {
    title: 'Sintomas Respiratorios',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/035-patient.png')}
      />
    ),
  };

  onSwipeLeft(gestureState) {
    console.log('You swiped left');
  }

  onSwipeRight(gestureState) {
    console.log('You swiped left');
  }

  _getState() {
    return this.state;
  }

 // _dispatch (update) {
 //   return this.state= this.reducer(this.state, update)
 // }
  //returnStore symptoms
  _storeSymptoms = async () => {
    try {
      console.log('sintomas 1 stored :' + this.sintomas1);
      await AsyncStorage.setItem('symptoms1', JSON.stringify(this.sintomas1));
      console.log(this.sintomas1);
    } catch (error) {
      console.log('error storing the symptoms' + error);
    }
  };

  //Store probabilty
  _storeProb = async () => {
    try {
      console.log('probability 1 stored :' + this.porcentaje1);
      await AsyncStorage.setItem(
        'probability1',
        JSON.stringify(this.porcentaje1)
      );
      console.log(this.porcentaje1);
    } catch (error) {
      console.log('error storing the probability' + error);
    }
  };

  // Calculate Sum of symptoms values
  _calculate = async () => {
    try {
      this.porcentaje1 = this.state.selectedSintomas.reduce(function (
        prev,
        cur
      ) {
        return prev + cur.value;
      },
      0);
      console.log('probability 1 calculated :' + this.porcentaje1);
    } catch (error) {
      console.log('error calculating the probability' + error);
    }
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <ScrollView style={styles.appContainer}>
        <GestureRecognizer
          gesturesEnabled={!this.state.selectedSintomas.length < 1}
          onSwipeLeft={() => {
            this._calculate();
            this._storeProb();
            this.props.navigation.navigate('SelectList2');
          }}
          config={config}>
          <Button
            title="Desliza hacia la izquierda para continuar"
            disabled={this.state.selectedSintomas.length < 1}
          />
          <SelectMultiple
            items={Symptoms.data}
            style={{ textAlign: 'center' }}
            // rowStyle={{ flexDirection: 'row', alignItems: 'center' }}
            labelStyle={{ fontSize: 25 }}
            checkboxStyle={{ width: 36, height: 36 }}
            selectedCheckboxStyle={{ width: 36, height: 36 }}
            //         renderLabel={renderLabel}
            selectedItems={this.state.selectedSintomas}
            onSelectionsChange={this.onSelectionsChange}
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
});
