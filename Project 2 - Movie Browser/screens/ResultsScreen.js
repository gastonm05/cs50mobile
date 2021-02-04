import React from 'react';
import Constants from 'expo-constants';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const processTitle = movie => ({
  title: movie.Title,
  year: movie.Year,
  type: movie.Type,
  imdb: movie.imdbID,
});

// API Call
const callApiPages = async url => {
  try {
    const response = await fetch(`${url}`);
    const { Search } = await response.json();
    const results = Search.map(movie => processTitle(movie));
    return results;
  } catch (err) {
    this.setState({ err: err.message });
  }
};

const callApi = async url => {
  try {
    const response = await fetch(`${url}`);
    const { totalResults } = await response.json();
    let pageNum = Math.ceil(totalResults / 10);
    let searchResults = [];
    let c = [];

    for (i = 1; i <= pageNum; i++) {
      const multiPageResults = await callApiPages(`${url}&page=${i}`);
      c = searchResults.concat(multiPageResults);
      searchResults = c;
    }
    return searchResults;
  } catch (err) {
    this.setState({ err: err.message });
  }
};

//No movies found
class NoMovies extends React.Component {
  render() {
    console.log(this.props.results);
    if (this.props.results.length < 1 && !this.props.loading) {
      return <Text style={styles.searchResult}> No Movies found</Text>;
    } else {
      return null;
    }
  }
}

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      results: [],
      pages: 0,
      loading: true,
    };
  }
  static navigationOptions = {
    title: 'Movies Results',
  };
  getResults = async () => {
    const url = this.props.navigation.getParam('url', 'No-Url');
    try {
      const results = await callApi(url);
      this.setState({
        results: results,
      });
    } catch (err) {
      this.setState({ err: err.message });
    }
  };

  UNSAFE_componentWillMount() {
    this.getResults();
    this.timeout();
  }

  timeout = () =>
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2500);

  keyExtractor = (item, index) => index.toString();

  //Navigate to Movie screen when movie selected
  onSelectMovie = item =>
    this.props.navigation.navigate('Information', {
      title: item.title,
      year: item.year,
      type: item.type,
      imdb: item.imdb,
    });
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/moviesBackground.png')}
        style={styles.backgroundImage}>
        <Text style={styles.search}>
          {' '}
          {JSON.stringify(
            this.props.navigation.getParam('search', 'no-search')
          )}
        </Text>
        <Text style={styles.exception}>{this.state.err}</Text>
        <NoMovies results={this.state.results} loading={this.state.loading} />
        {this.state.loading && <Text>Searching..</Text>}

        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.results}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.preview}
              onPress={() => this.onSelectMovie(item)}
              key={i}>
              <Text style={styles.data}>Title: {item.title}</Text>
              <Text style={styles.data}>Year: {item.year}</Text>
              <Text style={styles.data}>Type: {item.type}</Text>
            </TouchableOpacity>
          )}
        />
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
  search: {
    fontSize: 30,
    paddingBottom: 10,
    color: 'white',
  },
  searchResult: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  preview: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'blue',
  },
  data: {
    fontSize: 18,
    paddingVertical: 2,
    color: 'white',
  },
  exception: {
    color: 'red',
  },
});
