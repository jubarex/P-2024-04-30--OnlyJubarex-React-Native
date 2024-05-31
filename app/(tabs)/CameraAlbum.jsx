import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoTemp, setFotoTemp] = useState(undefined)

  const cameraTemp = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  async function savePhotoToLibraryAsync(foto) {
    if (!foto) {
      alert('No photo to save');
      return;
    }
  
    // Decode base64 image data and save it to a file
    const photoUri = `${FileSystem.cacheDirectory}photo.jpg`;
    await FileSystem.writeAsStringAsync(photoUri, foto, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    // Save the photo file to the media library
    const asset = await MediaLibrary.createAssetAsync(photoUri);
    await MediaLibrary.saveToLibraryAsync(asset);
  }

  async function takePic(){
    if (cameraTemp.current) {
      const fotoAtual = await cameraTemp.current.takePictureAsync({
        exif: false,
        base64: true,
        quality: 1,
      });
      setFotoTemp('data:image/jpg;base64,' + fotoAtual.base64);
      await savePhotoToLibraryAsync(fotoAtual.base64) 


    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraTemp}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Image style={{ flex: 1 }} source={{ uri: fotoTemp }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});