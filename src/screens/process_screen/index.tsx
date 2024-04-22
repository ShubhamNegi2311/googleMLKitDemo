import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppStackParamList} from '../../navigation/types';
import {recognizeImage} from '../../utils/ml_kit';

type ProcessScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ProcessScreen'
>;

const ProcessScreen: React.FC<ProcessScreenProps> = props => {
  const {imageURI} = props?.route?.params;

  React.useEffect(() => {
    if (imageURI) {
      processImage(imageURI);
    }
  }, [imageURI]);

  const processImage = async (uri: string) => {
    try {
      if (uri) {
        const response = await recognizeImage(uri);
        console.log('RESPONSE ===>', JSON.stringify(response));
      }
    } catch (error) {
      console.log('ERROR ===>', JSON.stringify(error));
    }
  };

  return <SafeAreaView style={{height: '100%', width: '100%'}}></SafeAreaView>;
};

export default ProcessScreen;
