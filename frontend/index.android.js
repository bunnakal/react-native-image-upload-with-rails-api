import React from 'react-native';
import App from './App';

var {
  View,
  Text,
  StyleSheet,
  ToolbarAndroid,
  ScrollView
} = React;

class Example extends React.Component {
  render() {
    return (
      <App />
    );
  }

}
var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#d2691e',
    height: 60
  },
  wrapper: {
    flex: 1
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  }
});

React.AppRegistry.registerComponent('Example', () => Example);