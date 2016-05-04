import React from 'react-native';

var App = require("./App");

var {
  View,
  Text,
  Image,
  Component
} = React;

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      city: this.props.city,
      email: this.props.email,
      imageSource: this.props.imageSource,
      location: this.props.location,
      tel: this.props.tel
    };
  }

  render() {
    console.log(this.props.city);
    return (
      <View>
        <Text>Welcome {this.props.city}</Text>
      </View>
    );
  }
}

module.exports = Result;