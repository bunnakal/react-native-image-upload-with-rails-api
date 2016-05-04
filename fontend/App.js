import React from 'react-native';
const {
  StyleSheet,
  Text,
  Navigator,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ToolbarAndroid,
  ScrollView,
  NativeModules: {
    ImagePickerManager
  }
} = React;
var Button = require('react-native-button');

export default class App extends React.Component {

  state = {
    imageSource: []
  };

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      storageOptions: {
        skipBackup: true,
        path: 'disk',
        savePrivate: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        var source;
        if (Platform.OS === 'android') {
          // source = {uri: response.uri, isStatic: true};
          source = {uri: 'data:image/jpg;base64,' + response.data, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        this.setState({
          imageSource: this.state.imageSource.concat(source)
        });
      }
    });
  }

  render() {
    var _scrollView: ScrollView;
    return (
      <Navigator
          initialRoute={{id: 'MainPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    var result = [];
    var _scrollView: ScrollView;
    if (routeId === 'MainPage') {
      return (
        <View style={styles.wraper}>
        <ToolbarAndroid
          navIcon={require("./assets/ic_logo.png")}
          title=" Image Uploader"
          titleColor="white"
          onActionSelected={this.onActionSelected}
          actions = {[
            {title: 'Synce',icon: require('./assets/ic_sync.png'), show: 'always',showWithText: true}
          ]}
          style={styles.toolbar} />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          >
        <View style={styles.form_container}>
          <Text style={styles.text_title}>Title :</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title} />
          <Text style={styles.text_title}>Description :</Text>
          <TextInput
            ref='city'
            style={styles.textinput}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description} />
          <Text style={styles.text_title}>Latitude :</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(latitude) => this.setState({latitude})}
            value={this.state.latitude} />
          <Text style={styles.text_title}>Longitude :</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(longitude) => this.setState({longitude})}
            value={this.state.longitude} />
        </View>

        <View style={styles.button_wrapper}>
          <Button
            onPress={this.selectPhotoTapped.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
          >
            Select Photo
          </Button>
          <Button
            onPress={this.gotoResultPage.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
          >
            Save Information
          </Button>
        </View>

          {
            this.state.imageSource.map(function(imageselected,key){
              return(
                <View key={key++} style={[styles.image, styles.imageContainer, {marginBottom: 20}]}>
                  <Image style={styles.image} source={imageselected} />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      )
    }
    if (routeId === 'Result') {
      return (
        <View style={styles.wraper}>
          <ToolbarAndroid
            navIcon={require("./assets/ic_logo.png")}
            title=" Image Uploader"
            titleColor="white"
            onActionSelected={this.onActionSelected}
            actions = {[
              {title: 'Synce',icon: require('./assets/ic_sync.png'), show: 'always',showWithText: true}
            ]}
            style={styles.toolbar} />
            <Text>welcome {this.state.city}</Text>
        </View>
      )
    }
    return this.noRoute(navigator);
  }

  gotoResultPage(){

    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://192.168.1.126:3000/properties/create');
    // xhr.setRequestHeader('content-type', 'multipart/form-data');
    // let formdata = new FormData();
    // this.state.imageSource.map(function(imageselected,key){
    //   formdata.append('property', {uri: imageselected.uri, name: new Date().getTime() + '.jpg', type: 'multipart/form-data'});
    // });
    // formdata.append('title', String(this.state.title));
    // formdata.append('description', String(this.state.description));
    // formdata.append('latitude', String(this.state.latitude));
    // formdata.append('longitude', String(this.state.longitude));
    // xhr.send(formdata);
    // console.log(xhr);
    // console.log(this.state.title);

    var API_URL = 'http://192.168.1.126:3000/properties/create';

    // let formData = new FormData();
    // this.state.imageSource.map(function(image,key){
    //   formData.append('property_image', {uri: image.uri});
    //   console.log(image.uri);
    // });

    // formData.append('title', String(this.state.title));
    // formData.append('description', String(this.state.description));
    // formData.append('latitude', String(this.state.latitude));
    // formData.append('longitude', String(this.state.longitude));

    var data={
      'property':{
        'property_image': this.state.imageSource,
        'title': this.state.title,
        'description': this.state.description,
        'latitude': this.state.latitude,
        'longitude': this.state.longitude
      }
    }

    console.log("uploading image");

    fetch(API_URL, {
      method: 'post',
      body: data
    }).then(response => {
      console.log("image uploaded");
      console.log(response);
    }).catch(console.log);

  }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  text_title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textinput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  wraper: {
    flex: 1,
  },
  form_container:{
    flexDirection: 'column',
    margin: 10
  },
  form_container_child: {
    flexDirection: 'row'
  },
  button_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container_button: {
    flex:1,
    margin: 10,
    padding:5,
    paddingTop: 10,
    height:45,
    borderRadius:4,
    backgroundColor: '#5f9ea0'
  },
  container: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    height: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5f9ea0'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    backgroundColor: '#F5FCFF',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  avatar: {
    flex: 1,
    width: 150,
    height: 30
  },
  image: {
    flex: 1,
    height: 300
  },
  imageContainer: {
    backgroundColor: '#F5FCFF',
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    margin: 5,
    flex: 1
  },
  containerImage: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  toolbar: {
    backgroundColor: '#d2691e',
    height: 60
  }
});

module.exports = App;