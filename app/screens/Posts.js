// Posts.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
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

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Button title="Edit" onPress={() => selectPost(item)} />
            <Button title="Delete" onPress={() => deletePost(item.id)} />
          </View>
        )}
      />
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        placeholder="Post Type"
        value={postType}
        onChangeText={setPostType}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TextInput placeholder="Number" value={number} onChangeText={setNumber} />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        placeholder="Video URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />
      <TextInput placeholder="Likes" value={likes} onChangeText={setLikes} />
      <TextInput placeholder="Shares" value={shares} onChangeText={setShares} />
      <Button
        title={selectedPost ? "Update Post" : "Add Post"}
        onPress={selectedPost ? updatePost : addPost}
      />
    </View>
  );
};

export default Posts;
