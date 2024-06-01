import React from "react";
import { Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

const TelaPerfil = () => {
  return (
    <ThemedView style={[styles.container, { marginTop: 35 }]}>
      <ThemedView>
        <>
          <ThemedText>Botão Voltar</ThemedText>
        </>
      </ThemedView>
      <ThemedView>
        <>
          <ThemedText>Mensagem</ThemedText>
        </>
      </ThemedView>
      <ThemedView>
        <ThemedView>
          <ThemedText>1k</ThemedText>
          <ThemedText>Followers</ThemedText>
        </ThemedView>
        <ThemedView>
          <Image></Image>
        </ThemedView>
        <ThemedView>
          <ThemedText>342</ThemedText>
          <ThemedText>Following</ThemedText>
        </ThemedView>

        <ThemedText>@Catherine13</ThemedText>
        <ThemedText>
          My name is Catherine. I like dancing in the rain and travelling all
          around the world.
        </ThemedText>
        <>
          <ThemedText>Follow</ThemedText>
        </>
        <>
          <ThemedText>Message</ThemedText>
        </>

        <>
          <ThemedText>All</ThemedText>
        </>
        <>
          <ThemedText>Photos</ThemedText>
        </>
        <>
          <ThemedText>Videos</ThemedText>
        </>

        <ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
          <ThemedView>
            <Image></Image>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default TelaPerfil;
