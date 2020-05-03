/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {YellowBox} from 'react-native';

import Routes from './src/routes';

const App = () => {
  return <Routes />;
};

YellowBox.ignoreWarnings(['Unrecognized WebSocket', 'Remote debugger']);

export default App;
