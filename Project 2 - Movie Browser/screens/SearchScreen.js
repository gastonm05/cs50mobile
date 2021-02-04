import React from 'react';
import Constants from 'expo-constants';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
} from 'react-native';

let apiKey = '29f5c479';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isFormValid: true,
      apiUrl: 'http://www.omdbapi.com/?apikey=${apiKey}&',
    };
  }

  handleTextChange = search => {
    if (search.length > 0) {
      this.setState({
        search,
        isFormValid: true,
      });
    } else {
      this.setState({
        search,
        isFormValid: false,
      });
    }
  };

  handleSubmit = () => {
    let cleanedSearch = this.state.search
      .trim()
      .replace(/\s/g, '+')
      .toLowerCase();
    let newUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${cleanedSearch}`;
    this.setState(
      {
        apiUrl: newUrl,
      },
      () =>
        this.props.navigation.navigate('Results', {
          url: this.state.apiUrl,
          search: this.state.search,
        })
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/moviesBackground.png')}
        style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="E.g. The Avengers"
            value={this.state.search}
            onChangeText={this.handleTextChange}
            autoCapitalize="words"
            clearButtonMode="always"
          />
          <Button
            title="Search"
            onPress={this.handleSubmit}
            disabled={!this.state.isFormValid}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

// Component Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    minWidth: 70,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
