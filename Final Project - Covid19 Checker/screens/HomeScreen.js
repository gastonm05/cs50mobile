import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import warning from '../data/texts';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerLeft: (
      <Image
        style={{
          width: 70,
          height: 55,
          marginLeft: 25,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/012-medical app.png')}
      />
    ),
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/wallpapers/wall1.png')}
        style={styles.backgroundImage}>
        <ScrollView style={styles.appContainer}>
          <View style={styles.manageData}>
            <Text style={styles.title}>Auto Diagnostico</Text>
            <Button
              style={styles.button}
              title="EMPEZAR"
              onPress={() => this.props.navigation.navigate('SelectList1')}
            />
            <Button
              style={styles.button}
              title="Ver Recomendaciones OMS"
              onPress={() => this.props.navigation.navigate('Prevention')}
            />
            <Text style={styles.info}>{warning.data[12].description}</Text>
          </View>
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
  title: {
    margin: 10,
    color: 'blue',
    fontSize: 30,
    textAlign: 'center',
  },
  info: {
    margin: 10,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    flex: 3,
  },
  manageData: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    margin: 5,
    padding: 5,
  },
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
  },
});
