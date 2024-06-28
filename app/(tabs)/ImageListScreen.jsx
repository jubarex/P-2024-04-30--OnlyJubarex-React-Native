import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { supabase } from '../../utils/supabase'; // Assuming you have configured Supabase client

const ImageListScreen = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Fetch list of files from Supabase Storage in 'public/' folder
      const { data, error } = await supabase.storage.from('midias').list('public');
      if (error) {
        console.error('Error fetching images:', error.message);
        return;
      }

      // Set state with images including URLs
      setImageList(data);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: `https://mzzfbyxibvjzgpxvdbfm.supabase.co/storage/v1/object/public/midias/public/${item.name}` }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Images from 'public' Folder in Supabase Bucket</Text>
      <FlatList
        data={imageList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default ImageListScreen;
