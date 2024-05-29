import React from "react";
import { View, Text, Image } from "react-native";

const TelaPerfil = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <View>
        <>
          <Text>Botão Voltar</Text>
        </>
      </View>
      <View>
        <>
          <Text>Mensagem</Text>
        </>
      </View>
      <View>
        <View>
          <Text>1k</Text>
          <Text>Followers</Text>
        </View>
        <View>
          <Image></Image>
        </View>
        <View>
          <Text>342</Text>
          <Text>Following</Text>
        </View>

        <Text>@Catherine13</Text>
        <Text>
          My name is Catherine. I like dancing in the rain and travelling all
          around the world.
        </Text>
        <>
          <Text>Follow</Text>
        </>
        <>
          <Text>Message</Text>
        </>

        <>
          <Text>All</Text>
        </>
        <>
          <Text>Photos</Text>
        </>
        <>
          <Text>Videos</Text>
        </>

        <View>
          <View>
            <Image></Image>
          </View>
          <View>
            <Image></Image>
          </View>
          <View>
            <Image></Image>
          </View>
          <View>
            <Image></Image>
          </View>
          <View>
            <Image></Image>
          </View>
          <View>
            <Image></Image>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TelaPerfil;
