import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { vibrate } from './utils';

class Count extends React.Component {
  shouldComponentUpdate() {
    return !this.props.comp;
  }
  render() {
    return (
      <Text
        style={{
          fontSize: 90,
          color: 'white',
        }}>
        {' '}
        {this.props.minutos}:{this.props.segundos}{' '}
      </Text>
    );
  }
}

// Estado inicial
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      segundos: '00',
      minutos: '25',
      resetval: '25',
      running: false,
      done: false,
      buttonTitle: 'Start',
      color: '#f44336',
      state: 'Work Timer',
    };
  }

  //Contador
  componentDidMount() {
    this.interval = setInterval(this.decrese, 1000);
  }
  decrese = () => {
    if (this.state.running & !this.state.done) {
      if (this.state.segundos > 0) {
        this.setState(prevState => ({
          segundos: String(parseInt(prevState.segundos) - 1),
        }));
        if (parseInt(this.state.segundos) < 10) {
          this.setState({
            segundos: '0' + String(this.state.segundos),
          });
        }
      } else {
        this.setState(prevState => ({
          minutos: String(parseInt(prevState.minutos) - 1),
          segundos: '59',
        }));
        if (parseInt(this.state.minutos) > 10) {
          this.setState({
            minutos: '' + String(this.state.minutos),
          });
        }
        if (parseInt(this.state.minutos) < 10) {
          this.setState({
            minutos: '0' + String(this.state.minutos),
          });
        }
      }
      if (
        parseInt(this.state.minutos) == '00' &&
        parseInt(this.state.segundos) == '000'
      ) {
        vibrate(100);
        console.log('¡Vibrando!');
        if (this.state.state === 'Work Timer') {
          this.setBreak();
        } else {
          this.setWork();
        }
      }
    }
  };

  //Start timer
  startTimer = () => {
    if ((this.state.minutos == '00') & (this.state.segundos == '00')) {
      this.setState({
        running: false,
      });
    } else {
      if (this.state.running === false) {
        this.setState({
          running: true,
          buttonTitle: 'Stop',
        });
      } else {
        this.setState({
          running: false,
          buttonTitle: 'Continue',
        });
      }
    }
  };

  // Pause timer
  handlePause = () => {
    this.setState({
      running: false,
    });
  };

  // Reset timer
  resetTimer = () => {
    this.setState(prevState => ({
      minutos: prevState.resetval,
      segundos: '00',
    }));
    this.setState({
      done: false,
      running: true,
      buttonTitle: 'Stop',
    });
  };

  //Setear propiedades de Work y Descanso
  setWork = () => {
    this.setState({
      state: 'Work Timer',
      minutos: '25',
      segundos: '00',
      resetval: '25',
      done: false,
      running: true,
      color: '#f44336',
    });
  };
  setBreak = () => {
    this.setState({
      state: 'Break Timer',
      minutos: '05',
      segundos: '00',
      resetval: '05',
      done: false,
      running: true,
      color: '#4CA6A9',
    });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: this.state.color },
        ]}>
        <View
          style={{ alignItems: 'center', flex: 9, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 7,
              alignItems: 'center',
            }}>
            <Button title={this.state.state} color="green" />
          </View>
          <Count
            minutos={this.state.minutos}
            segundos={this.state.segundos}
            comp={this.state.done}
          />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          />
          <Button
            title={this.state.buttonTitle}
            onPress={this.startTimer}
            color="grey"
          />
          <Button title="Reset" onPress={this.resetTimer} color="black" />
        </View>
        <View style={{ flex: 5 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'center',
  },
});
