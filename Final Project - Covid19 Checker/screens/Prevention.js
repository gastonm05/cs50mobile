import React from 'react';
import Constants from 'expo-constants';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

import recs from '../data/texts';

export default class Prevention extends React.Component {
  // Customize Header bar
  static navigationOptions = {
    title: 'Prevencion',
    headerRight: (
      <Image
        style={{
          width: 65,
          height: 50,
          marginRight: 30,
          resizeMode: 'contain',
        }}
        source={require('../assets/images/png/007-gloves.png')}
      />
    ),
  };

  render() {
    return (
      <ScrollView style={styles.appContainer}>
        <View style={{ margin: 20 }}>
          <View>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/037-hand washing.png')}
            />
            <Text style={styles.rec}>{recs.data[0].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/049-vaccine.png')}
            />
            <Text style={styles.rec}>{recs.data[1].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/036-stay home.png')}
            />
            <Text style={styles.rec}>{recs.data[2].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/039-food delivery.png')}
            />
            <Text style={styles.rec}>{recs.data[3].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/043-online shopping.png')}
            />
            <Text style={styles.rec}>{recs.data[4].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/016-computer.png')}
            />
            <Text style={styles.rec}>{recs.data[5].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/turnRight.png')}
            />
            <Text style={styles.rec}>{recs.data[6].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/022-events.png')}
            />
            <Text style={styles.rec}>{recs.data[7].description}</Text>
            <Image
              style={styles.recImg}
              source={require('../assets/images/png/032-emergency call.png')}
            />
            <Text style={styles.rec}>{recs.data[8].description}</Text>
            <Text style={styles.rec}>{'\n'}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flexDirection: 'column',
    //   justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rec: {
    margin: 10,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    flex: 3,
  },
  recImg: {
    width: 70,
    height: 70,
    alignItems: 'center',
    marginLeft: 150
  },
});
