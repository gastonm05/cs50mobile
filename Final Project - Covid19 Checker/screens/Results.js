import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import Constants from 'expo-constants';
import { Line, Circle } from 'rc-progress';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  Alert,
  StyleSheet,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';
import call from 'react-native-phone-call';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import dataService from '../actions/actions.js';

import recs from '../data/texts';

const API_HOST = 'covid-19-tracking.p.rapidapi.com';
const API_KEY = '466acf5602msh4c4254ae7dedd10p1bbc63jsn60fa25f4cf90';
//TODO Use questions from Questions.json file
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '5491122560566',
      msg: 'Hola',
      data: [],
    };
  }
  // Customize Header bar
  static navigationOptions = {
    title: 'Resultados',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/008-blood test.png')}
      />
    ),
  };

  //Retrieve questionaires symptoms values
  retrieveData = () => {
    const scores = [];
    AsyncStorage.getItem('probability1').then((value) => {
      scores.push(parseInt(value, 10));
    });
    AsyncStorage.getItem('probability2').then((value) => {
      scores.push(parseInt(value, 10));
    });
    AsyncStorage.getItem('probability3').then((value) => {
      console.log('value :' + value);
      scores.push(parseInt(value, 10));
      console.log('scores :' + scores);
    });
    AsyncStorage.getItem('answer1').then((value) => {
      console.log('value :' + value);
      scores.push(parseInt(value, 10));
      console.log('scores :' + scores);
    });
    AsyncStorage.getItem('answer2').then((value) => {
      console.log('value :' + value);
      scores.push(parseInt(value, 10));
      console.log('scores :' + scores);
    });
    AsyncStorage.getItem('answer3').then((value) => {
      console.log('value :' + value);
      scores.push(parseInt(value, 10));
      console.log('scores :' + scores);

      //Calculate changes according to symptoms
      const totalScores = scores.reduce(
        (previousScore, currentScore, index) => previousScore + currentScore,
        0
      );
      Alert.alert(
        'Usted tiene un ' +
          totalScores +
          '% de probabilidad de estar infectado por el Covid-19'
      );
    });
  };

  componentDidMount() {
    fetch('https://covid-19.dataflowkit.com/v1/argentina', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _sendWhatsApp = async () => {
    let msg = this.state.msg;
    let mobile = this.state.mobile_no;
    if (mobile) {
      if (msg) {
        let url =
          'whatsapp://send?text=' +
          this.state.msg +
          '&phone=' +
          this.state.mobile_no;
        Linking.openURL(url)
          .then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  _callImmediate2 = async () => {
    try {
      const args = {
        number: '120', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
      };

      call(args).catch(console.error);
    } catch (error) {
      console.log('error when trying to call' + error);
    }
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <ImageBackground
        source={require('../assets/images/wallpapers/wall1.png')}
        style={styles.backgroundImage}>
        <ScrollView style={styles.appContainer}>
          <GestureRecognizer
            onSwipeRight={(state) =>
              this.props.navigation.navigate('SelectList5')
            }
            config={config}>
            <View style={styles.manageData}>
              <Text style={styles.statsTitle}> Argentina</Text>
              <Text style={styles.confirmed}>
                Contagiados : {this.state.data['Active Cases_text']}
              </Text>
              <Text style={styles.deaths}>
                Fallecidos : {this.state.data['Total Deaths_text']}
              </Text>
              <Text style={styles.recovered}>
                Recuperados : {this.state.data['Total Recovered_text']}
              </Text>
              <Text style={styles.rec}>
                Fallecidos Nuevos : {this.state.data['New Deaths_text']}
              </Text>
              <View style={styles.inline}>
                <Button
                  style={styles.button}
                  title="Ver resultado del Auto Diagnostico"
                  onPress={() => {
                    this.retrieveData();
                  }}
                />
              </View>
              <Text style={styles.rec}>{recs.data[18].description}</Text>

              <View style={styles.inline}>
                <Image
                  source={require('../assets/images/logos/mins3.png')}
                  style={styles.recImg}
                />
                <Button
                  style={styles.button}
                  title="Llamar linea Covid 19"
                  onPress={() => {
                    this._callImmediate2();
                  }}
                />
              </View>
              <Text style={styles.rec}>{recs.data[16].description}</Text>
              <View style={styles.inline}>
                <Image
                  source={require('../assets/images/logos/wp4.png')}
                  style={styles.recImg}
                />
                <Button
                  style={styles.button}
                  title="Chatear con el Ministerio de Salud"
                  onPress={() => {
                    this._sendWhatsApp();
                  }}
                />
              </View>
              <Text style={styles.rec}>{recs.data[17].description}</Text>
            </View>
          </GestureRecognizer>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    textAlign: 'center',
  },
  manageData: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    margin: 5,
    padding: 5,
  },
  appContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  button: {},
  confirmed: {
    //  margin: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'blue',
    flex: 3,
  },
  deaths: {
    //  margin: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    flex: 3,
  },
  recovered: {
    //  margin: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
    flex: 3,
  },
  rec: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
    flex: 3,
  },
  statsTitle: {
    margin: 10,
    color: 'blue',
    fontSize: 23,
    textAlign: 'center',
    flex: 3,
    fontWeight: 'bold',
  },
  recImg: {
    width: 45,
    height: 45,
    alignItems: 'center',
  },
  inline: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
