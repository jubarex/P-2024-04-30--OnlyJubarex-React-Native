import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {

  const imageSource = selectedImage ?  { uri: selectedImage } : placeholderImageSource;



  return (
  
   <Image source={imageSource} style={styles.image} />
 
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

