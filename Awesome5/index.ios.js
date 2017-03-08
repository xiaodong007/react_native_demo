/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//import React, { Component } from 'react';
//import { AppRegistry, Navigator, Text, View } from 'react-native';
//import App from './App';
//import MyScene from './MyScene';
//
//
//class Awesome5 extends Component {
//    render() {
//        return (
//            <Navigator
//                initialRoute={{ title: 'My Initial Scene', index: 0 }}
//                renderScene={(route, navigator) =>
//          <MyScene
//            title={route.title}
//
//            // Function to call when a new scene should be displayed
//            onForward={ () => {
//              const nextIndex = route.index + 1;
//              navigator.push({
//                title: 'Scene ' + nextIndex,
//                index: nextIndex,
//              });
//            }}
//
//            // Function to call to go back to the previous scene
//            onBack={() => {
//              if (route.index > 0) {
//                navigator.pop();
//              }
//            }}
//          />
//        }
//                />
//        )
//    }
//}
//
//
//AppRegistry.registerComponent('Awesome5', () => Awesome5);


import React, {Component} from 'react';
import {AppRegistry, Navigator} from 'react-native';
import App from './App';

const defaultRoute = {component: App};

export default class Awesome5 extends Component {
    render() {
        return (
            <Navigator
                initialRoute={defaultRoute}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump }
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return (
                        <Component {...route.params} navigator={navigator} />
                    );
                  }
                }
                />
        );
    }
}

AppRegistry.registerComponent('Awesome5', () => Awesome5);