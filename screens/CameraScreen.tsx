import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
const CameraScreen = () => {
const cameraRef = useRef<RNCamera | null>(null);
const takePicture = async () => {
if (cameraRef.current) {
const options = { quality: 0.5, base64: true };
const data = await cameraRef.current.takePictureAsync(options);
console.log(data.uri); // URI da imagem capturada
// Salvar a imagem na galeria se necessário
}
};

return (
<View style={{ flex: 1 }}>
<RNCamera
ref={cameraRef}
style={{ flex: 1 }}
captureAudio={false}
type={RNCamera.Constants.Type.back}
/>
<Button title="Tirar Foto" onPress={takePicture} />
</View>
);
};
export default CameraScreen;