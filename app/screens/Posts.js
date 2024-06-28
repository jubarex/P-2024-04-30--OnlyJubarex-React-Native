import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { supabase } from "../../utils/supabase";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("1");
  const [postType, setPostType] = useState("2");
  const [content, setContent] = useState("1");
  const [number, setNumber] = useState("1");
  const [imageUrl, setImageUrl] = useState("1");
  const [videoUrl, setVideoUrl] = useState("1");
  const [likes, setLikes] = useState("1");
  const [shares, setShares] = useState("1");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      Alert.alert("Error fetching posts", error.message);
    }
  };

  const addPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: userId,
            post_type: postType,
            content: content,
            number: number,
            image_url: imageUrl,
            video_url: videoUrl,
            likes: likes,
            shares: shares,
          },
        ])
        .select("*");
      if (error) throw error;
      if (!data) throw new Error("No data returned from insert");

      setPosts([...posts, ...data]);
    } catch (error) {
      Alert.alert("Error adding post", error.message);
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({
          user_id: userId,
          post_type: postType,
          content: content,
          number: number,
          image_url: imageUrl,
          video_url: videoUrl,
          likes: likes,
          shares: shares,
        })
        .eq("id", selectedPost.id)
        .select("*");
      if (error) throw error;
      if (!data) throw new Error("No data returned from update");

      setPosts(
        posts.map((post) => (post.id === selectedPost.id ? data[0] : post))
      );
      setSelectedPost(null);
    } catch (error) {
      Alert.alert("Error updating post", error.message);
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      Alert.alert("Error deleting post", error.message);
      console.error("Error deleting post:", error);
    }
  };

  const selectPost = (post) => {
    setSelectedPost(post);
    setUserId(post.user_id);
    setPostType(post.post_type);
    setContent(post.content);
    setNumber(post.number);
    setImageUrl(post.image_url);
    setVideoUrl(post.video_url);
    setLikes(post.likes);
    setShares(post.shares);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postText}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => selectPost(item)} />
        <Button title="Delete" onPress={() => deletePost(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Type"
        value={postType}
        onChangeText={setPostType}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Number"
        value={number}
        onChangeText={setNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Video URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Likes"
        value={likes}
        onChangeText={setLikes}
      />
      <TextInput
        style={styles.input}
        placeholder="Shares"
        value={shares}
        onChangeText={setShares}
      />
      <Button
        title={selectedPost ? "Update Post" : "Add Post"}
        onPress={selectedPost ? updatePost : addPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default Posts;
