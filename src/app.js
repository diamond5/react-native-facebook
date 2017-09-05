/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
export default class TestUulala extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      name: ''
    }
  }

  _loginFacebook = () => {
    this.setState({
      loading: true
    })

    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
      if (result.isCancelled) {
        this.setState({
          loading: false
        })
      }
      else {
        var params = {
          httpMethod: 'GET',
          parameters: {
            'fields': {
                'string' : 'name'
            }
          }
        }
        const infoRequest = new GraphRequest(
          '/me',
          params,
          (error, facebookUserInformation) => {
            this.setState({
              loading: false,
              name: facebookUserInformation.name
            })

          }
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      }
    }).catch(error=> {
      this.setState({
        loading: false
      })
      alert("error: " + JSON.stringify(error))

    })
  }

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        animating={true}
        size={'large'}
      />
    )
  }

  _renderNameScreen() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.name}</Text>
        <Button
          onPress={() => this.setState({name: ''})}
          title="Go Back"
          color="blue"
        />
      </View>
    );
  }

  render() {
    if (this.state.name)
      return this._renderNameScreen()

    return (
      <Image source={require('../img/bg.png')} style={styles.container}>
        <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
         />
        <View style={styles.containerLogo}>
          <Image style={styles.logo} resizeMode="contain" source={require('../img/logo.png')}/>
        </View>
        <View style={styles.containerContent}>
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.loginButton}>
              <Image style={{position: 'absolute', left: 15, height: 30, width: 30}} resizeMode="contain" source={require('../img/user-icon.png')} />
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <View style={styles.orContainerColumn}>
                <View style={styles.horizontalSeperator}></View>
              </View>
              <View style={styles.orColumnMiddle}><Text style={styles.orText}>or</Text></View>
              <View style={styles.orContainerColumn}>
                <View style={styles.horizontalSeperator}></View>
              </View>
            </View>
            <TouchableOpacity style={[styles.loginFacebookButton, {alignItems: 'flex-end', paddingRight: 30}]} onPress={this._loginFacebook}>
              <Image style={{position: 'absolute', left: 13,height: 30, width: 30}} resizeMode="contain" source={require('../img/facebook-logo.png')} />
              <Text style={styles.buttonText}>Connect With Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.bottomText}>Don't Have an Account?</Text>
            <TouchableOpacity style={styles.createAccountButton}>
              <Text style={styles.createAccountButtonText}>Create Account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading ? this._renderActivityIndicator() : null}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    // marginLeft: 30,
    // marginRight: 30,
    height: 200,
    width: 300
  },
  containerContent: {
    flex: 1
  },
  loginButton: {
    height: 50,
    marginHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b64b14'
  },
  orContainer: {
    height: 50,
    marginHorizontal: 37.5,
    flexDirection: 'row'
  },
  orContainerColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  orColumnMiddle: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  orText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 6
  },
  horizontalSeperator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  loginFacebookButton: {
    height: 50,
    marginHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e5790'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  bottomText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  createAccountButton: {
    marginTop: 15,
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3879b9',
    backgroundColor: '#1f325b',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountButtonText: {
    backgroundColor: 'transparent',
    color: '#3879b9',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('TestUulala', () => TestUulala);
