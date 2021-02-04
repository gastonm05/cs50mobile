import React from 'react';
import Constants from 'expo-constants';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const processDetails = movie => ({
  Title: movie.Title,
  Released: movie.Released,
  Awards: movie.Awards,
  Type: movie.Type,
  Genre: movie.Genre,
  Rated: movie.Rated,
  Runtime: movie.Runtime,
  Director: movie.Director,
  Writers: movie.Writers || movie.Writer,
  Actors: movie.Actors,
  Plot: movie.Plot,
  IMDBID: movie.imdbID,
});

class ShowImage extends React.Component {
  render() {
    if (
      Platform.OS === 'ios' &&
      this.props.poster != 'N/A' &&
      this.props.poster != ''
    ) {
      return (
        <View style={styles.imageView}>
          <Image
            style={{ width: 268, height: 400 }}
            source={{ url: this.props.poster }}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

export default class MovieScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataKeys: [],
      poster: '',
      rating: '',
    };
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: params.title,
    };
  };
  UNSAFE_componentWillMount() {
    this.getDetails();
  }

  getDetails = async () => {
    let apiKey = '58e46ddd';
    let imdb = this.props.navigation.getParam('imdb', '');
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdb}`;
    try {
      const response = await fetch(`${url}`);
      const results = await response.json();
      const data = await processDetails(results);

      this.setState({
        data: data,
        dataKeys: Object.keys(data),
        poster: results.Poster,
        rating: results.imdbRating,
      });
    } catch (err) {
      this.setState({ err: err.message });
    }
  };
  render() {
    const title = this.props.navigation
      .getParam('title', 'Title')
      .replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    const year = this.props.navigation.getParam('year', 'Year');
    const data = this.state.data;
    const dataKeys = this.state.dataKeys;

    const manageData = dataKeys.map((key, i) => {
      if (data[key] != 'N/A' && data[key] != '') {
        return (
          <Text key={i} style={styles.details}>
            {key}: {data[key]}
          </Text>
        );
      }
    });

    return (
      <ImageBackground
        source={require('../assets/images/moviesBackground.png')}
        style={styles.backgroundImage}>
        <ScrollView style={styles.appContainer}>
          <ShowImage poster={this.state.poster} />
          <Text style={styles.rating}>
            {this.state.rating} <Icon name="star" size={30} color="gold" />
          </Text>
          <View style={styles.manageData}>{manageData}</View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

// Component Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    textAlign: 'center',
  },
  details: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: '#0792e3',
  },
  imageView: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageData: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 5,
    padding: 5,
  },
  rating: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
});
