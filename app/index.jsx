import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Alert,
    TouchableOpacity,
    Pressable
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";





export default function Index() {
    const [key, onChangeKey] = useState('');

    const [value, onChangeValue] = useState('');
    const [queryKey, onChangeQueryKey] = useState('');

    const [telaAtual, onChangeTelaAtual] = useState(true)


    const registrarNome = useRef(null);
    const registrarSenha = useRef(null);
    const loginNome = useRef(null);
    const loginSenha = useRef(null);


    const [autenticado, onAutenticar] = useState('')

    const router = useRouter();

    const mostrarTela = async () => {
        await getValueFor(loginNome.current, loginSenha.current);
    }

    const mudarTela = () => {
        onChangeTelaAtual(!telaAtual)
    }


    // Function to save key-value pair in secure storage
    async function save(key, value) {
        try {
            await SecureStore.setItemAsync(key, value);
            Alert.alert('Successo!', 'Cadastrado com sucesso!');
        } catch (error) {
            Alert.alert('Erro!', 'Falha ao cadastrar-se');
        }
    }

    // Function to get value for a given key from secure storage
    async function getValueFor(key, senha) {
        try {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
                // Alert.alert("🔐 Entrou com sucesso! 🔐", 'Carregando..');

                if (senha == result) {
                    Alert.alert("🔐 Entrou com sucesso! 🔐", 'Carregando..');
                    router.push('/(tabs)')
                } else {
                    Alert.alert("Esse cadastro existe", 'Mas você errou a senha 😂🧉..');
                    // colocar lógica pra ir pro aplicativo
                }
            } else {
                Alert.alert('Não existe esse cadastro', 'Confira as informações inseridas.');
            }
        } catch (error) {
            Alert.alert('Tente Novamente', 'Não foi possível entrar.');
        }
    }

    const Registrar = () => {
        return (
            <View style={{ width: '100%', backgroundColor: '#f9c2ff', padding: 15, borderRadius: 20, borderTopStartRadius: 0, borderTopRightRadius: 0, height: 'auto' }}>
                <Text style={{ color: 'black', marginBottom: 20, marginTop: 20, textAlign: 'left', width: '100%', fontSize: 32 }}>Registre-se:</Text>
                {/* <Text style={{ marginBottom: 20 }}>Save an item and retrieve it later!</Text> */}

                {/* Input fields for key and value */}
                <Text style={{ textAlign: 'left', width: '100%', marginBottom: 5 }}>Nome:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Insira seu nome"
                    value={registrarNome.current}
                    onChangeText={(text) => registrarNome.current = text}
                />
                <Text style={{ textAlign: 'left', width: '100%', marginBottom: 5 }}>Senha:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Insira sua senha"
                    value={registrarSenha.current}
                    onChangeText={(text) => registrarSenha.current = text}
                />

                {/* Save button */}
                <TouchableOpacity
                    style={{ backgroundColor: '#f72585', padding: 12, borderRadius: 10, alignSelf: 'flex-start', paddingHorizontal: 50 }}

                    title="Registrar!"
                    onPress={() => {
                        save(registrarNome.current, registrarSenha.current);
                        registrarNome.current = ''; // Reset nome input after saving
                        registrarSenha.current = ''; // Reset senha input after saving
                    }}
                >
                    <Text style={{ color: 'white' }}>Registrar!</Text>
                </TouchableOpacity>



            </View>
        )
    }

    const Login = () => {
        return (
            <View style={{ width: '100%', backgroundColor: '#32a78c', padding: 15, borderRadius: 20, borderTopStartRadius: 0, borderTopRightRadius: 0, height: 'auto' }}>
                <Text style={{ color: 'black', marginBottom: 20, marginTop: 20, textAlign: 'left', width: '100%', fontSize: 32 }}>Entre:</Text>
                {/* <Text style={{ marginBottom: 20 }}>Save an item and retrieve it later!</Text> */}

                {/* Input fields for key and value */}
                <Text style={{ textAlign: 'left', width: '100%', marginBottom: 5 }}>Nome:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Insira seu nome"
                    value={loginNome.current}
                    onChangeText={(text) => loginNome.current = text}
                />
                <Text style={{ textAlign: 'left', width: '100%', marginBottom: 5 }}>Senha:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Insira sua senha"
                    value={loginSenha.current}
                    onChangeText={(text) => loginSenha.current = text}
                />

                {/* Save button */}
                <TouchableOpacity
                    style={{ backgroundColor: '#42bf37', padding: 12, borderRadius: 10, alignSelf: 'flex-start', paddingHorizontal: 50 }}

                    title="Entrar"
                    onPress={() => {
                        mostrarTela();
                        loginNome.current = ''; // Reset nome input after saving
                        loginSenha.current = ''; // Reset senha input after saving
                    }}
                >
                    <Text style={{ color: 'black' }}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: '#42bf37', padding: 12, borderRadius: 10, alignSelf: 'flex-start', paddingHorizontal: 50 }}

                    title="Entrar"
                    onPress={() => {
                        router.push('/(tabs)')
                        loginNome.current = ''; // Reset nome input after saving
                        loginSenha.current = ''; // Reset senha input after saving
                    }}
                >
                    <Text style={{ color: 'black' }}>Entrar</Text>
                </TouchableOpacity>



            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', height: '10%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ backgroundColor: '#f9c2ff', width: '50%', height: '100%' }} onPress={mudarTela}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%', paddingBottom: 15 }}>
                        Registrar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#32a78c', width: '50%', height: '100%' }} onPress={mudarTela}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%', paddingBottom: 15 }}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
            {telaAtual ?
                <Registrar></Registrar>
                :
                <Login></Login>}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: 'black',
        // padding: 20,


    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
});
