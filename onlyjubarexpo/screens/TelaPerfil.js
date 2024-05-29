import React from 'react';
import { View, Text, Image, Touchable } from 'react-native';

const TelaPerfil = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 100,
                padding: 20,
            }}>

            <View>
                <Touchable>
                    <Text>Botão Voltar</Text>
                </Touchable>
            </View>
            <View>
                <Touchable>
                    <Text>Mensagem</Text>
                </Touchable>
            </View>
            <View>
                <View>  <Text>1k</Text>
                    <Text>Followers</Text> </View>
                <View><Image></Image></View>
                <View>  <Text>342</Text>
                    <Text>Following</Text> </View>


                <Text>@Catherine13</Text>
                <Text>My name is Catherine. I like dancing in the rain and travelling all around the world.</Text>
                <Touchable><Text>Follow</Text></Touchable>
                <Touchable><Text>Message</Text></Touchable>

                <Touchable><Text>All</Text></Touchable>
                <Touchable><Text>Photos</Text></Touchable>
                <Touchable><Text>Videos</Text></Touchable>

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