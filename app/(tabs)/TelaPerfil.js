import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import macaco from "../../assets/images/fundo-mobile.jpg";

const image = { uri: macaco };

import monkey from "../../assets/images/macaco-no-computador.jpg";

const monkeyUri = require("../../assets/images/macaco-no-computador.jpg");

import { useRouter } from "expo-router";

const DATA = [
  {
    id: "3a5c68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "586694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
  {
    id: "bd37acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },

  {
    id: "58694a0f-93da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
  {
    id: "bd7acb7ea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },

  {
    id: "3ac68afc-8c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "bd7acbea-c1b10-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },
  {
    id: "3ac68afc-c605-48d03-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "58694a0f-3da1-4710f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
  {
    id: "3a5c968afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "5886694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
  {
    id: "bd377acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },

  {
    id: "586694a0f-93da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
  {
    id: "bd75acb7ea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },

  {
    id: "3ac684afc-8c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "bd73acbea-c1b10-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("../../assets/images/bliss.jpg"),
  },
  {
    id: "3ac628afc-c605-48d03-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/images/wallpaper1.jpg"),
  },

  {
    id: "586941a0f-3da1-4710f-bd96-145571e29d72",
    title: "Third Item",
    image: require("../../assets/images/wallpaper3.jpg"),
  },
];

const Item = ({ title, image, _onPress }) => (
  <TouchableOpacity
    onPress={() => {
      if (_onPress) {
        _onPress();
      }
      alert("clicado item do titulo " + title);
    }}
    style={styles.item}
  >
    <Image
      style={[{ height: "100%", width: "100%", flex: 1 }, styles.image]}
      source={image}
    ></Image>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const TelaPerfil = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  const router = useRouter();

  const goToTutorial = () => {
    router.push("/screens/TutorialTela"); // Ensure this path is correct
  };

  const goToMensagens = () => {
    router.push("/screens/explore"); // Ensure this path is correct
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground source={macaco} resizeMode="cover" style={styles.image}>
        <View style={styles.navbar}>
          <>
            <Ionicons
              onPress={() => {
                // colocar aqui navegacao pra outra pagina
                alert("volta home");
              }}
              name="arrow-back-outline"
              size={32}
              color="#f72585"
            />
            <Ionicons
              onPress={() => {
                // colocar aqui navegacao pra outra pagina
                alert("rapaz ele ta sem zap");
                goToMensagens();
              }}
              name="chatbox"
              size={32}
              color="#f72585"
            />
          </>
        </View>
        <View
          style={{
            marginTop: "25%",
            flex: 1,
            alignItems: "center",
            backgroundColor: "#ccc",
            borderTopLeftRadius: 42,
            borderTopRightRadius: 42,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", padding: 32 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 7 }}
              >
                1k
              </Text>
              <Text>Followers</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // bora tomar uma
                  // alert("monkeyUri.toString()");
                  // console.log(monkeyUri.toString());
                  // console.log(monkey.toString());
                  goToTutorial();
                }}
              >
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 50,
                    borderWidth: 5,
                    borderColor: "black",
                    marginTop: -65,
                  }}
                  source={monkey}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", padding: 32 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, paddingBottom: 7 }}
              >
                342
              </Text>
              <Text>Following</Text>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>@jubarex</Text>
          <Text
            style={{
              alignItems: "center",
              textAlign: "center",
              maxWidth: "42ch",
              paddingTop: 11,
            }}
          >
            Watashi no na wa “kirayoshikage” nenrei 33-sai jitaku wa moriōchō
            hokutō-bu no bessō chitai ni ari… kekkon wa shite inai… shigoto wa
            “kameyūchēn-ten” no kaishain de
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // salvar
                alert("salvar");
              }}
              style={[styles.button, { marginRight: 20 }]}
            >
              <Ionicons name="save" size={32} color="white"></Ionicons>
              <Text style={{ color: "white" }}>Salve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // bora tomar uma
                alert("bora tomar uma?");
              }}
              style={[styles.button, { marginLeft: 20 }]}
            >
              <Ionicons name="beer" size={32} color="white"></Ionicons>
              <Text style={{ color: "white" }}>Bora</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // Tudo
                alert("Todas");
              }}
              style={[{ marginLeft: 20 }]}
            >
              <Text>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Fotos
                alert("Fotos");
              }}
              style={[{ marginLeft: 20 }]}
            >
              <Text>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Videos
                alert("Videos");
              }}
              style={[{ marginLeft: 20 }]}
            >
              <Text>Videos</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              width: "100%",
              marginTop: 10,
            }}
          >
            <FlatList
              numColumns={3}
              data={DATA}
              renderItem={({ item }) => (
                <Item image={item.image} title={item.title} />
              )}
              // keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    // marginTop: 35,
    padding: 10,
    paddingTop: 35,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f72585",
    padding: 10,
    width: "15ch",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    height: "30%",
    // width: "30%",
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: "50%",
  },
  title: {
    fontSize: 10,
    color: "black",
  },
});

export default TelaPerfil;
