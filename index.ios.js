var React = require('react-native');


var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var Marketplace = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },
  componentDidMount: function () {
    this.fetchData();
  },
  fetchData: function () {
    fetch(REQUEST_URL).then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true
      });
    }).done();
  },
  renderLoadingView: function () {
    return (<View style={styles.container}>
      <Text>{'Loading movies...'}</Text>
    </View>);
  },
  renderMovie: function (movie) {
    return (<View style={styles.container}>
      <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>
      </View>
    </View>);
  },
  render: function () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (<ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView}
    />);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  thumbnail: {
    height: 81,
    width: 53
  },
  year: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Marketplace', () => Marketplace);
