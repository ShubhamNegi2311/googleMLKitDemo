import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AppStackParamList} from '../../navigation/types';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const [imageURI, setImageURI] = React.useState<string>('');

  const handleCameraClicked = React.useCallback(async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      selectionLimit: 1,
    };
    const result: ImagePickerResponse = await launchCamera(options);
    if (result) {
      const assets = result?.assets ?? [];
      if ((assets?.length ?? 0) > 0) {
        console.log('IMAGE_URI ===>', assets[0]?.uri ?? '');
        setImageURI(assets[0]?.uri ?? '');
      }
    }
  }, []);

  const handleGalleryClicked = React.useCallback(async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      selectionLimit: 1,
    };
    const result: ImagePickerResponse = await launchImageLibrary(options);
    if (result) {
      const assets = result?.assets ?? [];
      if ((assets?.length ?? 0) > 0) {
        console.log('IMAGE_URI ===>', assets[0]?.uri ?? '');
        setImageURI(assets[0]?.uri ?? '');
      }
    }
  }, []);

  const handleProcessClicked = React.useCallback(() => {
    props.navigation.navigate('ProcessScreen', {
      imageURI: imageURI,
    });
  }, [imageURI]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 20,
      }}>
      <View style={{flexGrow: 1, flexShrink: 1, padding: 20}}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{uri: imageURI ?? ''}}
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'teal',
          }}
          onPress={handleCameraClicked}
          children={<Text>{'Camera'}</Text>}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'teal',
          }}
          onPress={handleGalleryClicked}
          children={<Text>{'Gallery'}</Text>}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'teal',
          }}
          onPress={handleProcessClicked}
          children={<Text>{'Process'}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
