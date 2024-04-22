import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppNavigator from './src/navigation/app_navigator';
import {AppStackParamList} from './src/navigation/types';

type Props = {};

const Stack = createNativeStackNavigator<AppStackParamList>();

const App = () => {
  return <AppNavigator />;
};

export default App;
