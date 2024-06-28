import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

const PostsLista = () => {
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
      {/* User Info */}
      <View style={styles.userInfo}>
        {/* Profile Picture (assuming you have it) */}
        {/* <Image
          source={{ uri: item.user.profilePicture }}
          style={styles.profilePicture}
        /> */}
        <View style={styles.userDetails}>
          {/* <Text style={styles.userName}>{item.user.username}</Text> */}
          <Text style={styles.postTime}>{item.postTime}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postText}>{item.content}</Text>

      {/* Media Content (Image or Video) */}
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.postMedia} />
      )}

      {/* Likes and Shares */}
      <View style={styles.likesSharesContainer}>
        <Text style={styles.likesText}>{item.likes} Likes</Text>
        <Text style={styles.sharesText}>{item.shares} Shares</Text>
      </View>
    </View>
  );

  const ListaDePosts = () => {
    return (
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    );
  };

  const router = useRouter();

  const irParaCriar = () => {
    router.push("screens/CriarPost");
  };

  return (
    <View style={{ flex: 1 }}>
      <ListaDePosts></ListaDePosts>
      <View>
        <TouchableOpacity
          style={{ height: 45, justifyContent: "center" }}
          onPress={irParaCriar}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              padding: 10,
            }}
          >
            <Text
              style={{
                // flexDirection: "column",
                textAlign: "center",

                fontSize: 18,
                color: "white",
              }}
            >
              Novo Post (+)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
  // postItem: {
  //   marginBottom: 10,
  //   padding: 10,
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 5,
  //   width: "100%",
  // },
  // postText: {
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
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
  label: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
    marginTop: 10,
  },
  postItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#808080",
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postMedia: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  likesSharesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesText: {
    color: "#007bff",
  },
  sharesText: {
    color: "#007bff",
  },
});

export default PostsLista;
