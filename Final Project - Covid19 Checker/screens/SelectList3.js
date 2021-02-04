import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import SelectMultiple from 'react-native-select-multiple';
import Symptoms from '../data/symptoms3';

export default class SelectList3 extends React.Component {
  state = { selectedSintomas: [] };

  onSelectionsChange = (selectedSintomas) => {
    // selectedSintomas is array of { label, value }
    this.setState({ selectedSintomas });
    console.log(selectedSintomas);
  };

    static navigationOptions = {
    title: 'Sintomas Sensoriales',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/025-thermometer.png')}
      />
    ),
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('list3', JSON.stringify(this.state));
    } catch (error) {
      console.log(error);
    }
  };

  //Store probabilty
  _storeProb = async () => {
    try {
      console.log('probability 3 stored :' + this.porcentaje1);
      await AsyncStorage.setItem(
        'probability3',
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
      console.log('probability 3 calculated :' + this.porcentaje1);
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
          onSwipeLeft={() => {
            this._calculate();
            this._storeProb();
            this.props.navigation.navigate('SelectList4');
          }}
          onSwipeRight={() => {
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
