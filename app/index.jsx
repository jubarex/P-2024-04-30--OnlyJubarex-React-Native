import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    Alert,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Function to save key-value pair in secure storage
async function save(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
        Alert.alert('Success', 'Data saved successfully');
    } catch (error) {
        Alert.alert('Error', 'Failed to save data');
    }
}

// Function to get value for a given key from secure storage
async function getValueFor(key) {
    try {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            Alert.alert("🔐 Here's your value 🔐", result);
        } else {
            Alert.alert('No value found', 'No values stored under that key.');
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to retrieve data');
    }
}

export default function Index() {
    const [key, onChangeKey] = useState('');

    const [value, onChangeValue] = useState('');
    const [queryKey, onChangeQueryKey] = useState('');


    const [registrarNome, onRegistrarNome] = useState('');
    const [registrarSenha, onRegistrarSenha] = useState('');


    const [loginNome, onLoginNome] = useState('');
    const [loginSenha, onLoginSenha] = useState('');

    const [autenticado, onAutenticar] = useState('')



    const mostrarTela = async () => {
        await getValueFor(queryKey);
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', marginBottom: 20, marginTop: 20, textAlign: 'left', width: '100%', fontSize: 32 }}>Registre-se:</Text>
            {/* <Text style={{ marginBottom: 20 }}>Save an item and retrieve it later!</Text> */}

            {/* Input fields for key and value */}
            <TextInput
                style={styles.textInput}
                placeholder="Enter key"
                value={key}
                onChangeText={text => onChangeKey(text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter value"
                value={value}
                onChangeText={text => onChangeValue(text)}
            />

            {/* Save button */}
            <Button
                title="Save this key/value pair"
                onPress={() => {
                    save(key, value);
                    onChangeKey(''); // Reset key input after saving
                    onChangeValue(''); // Reset value input after saving
                }}
            />

            {/* Input field to retrieve value */}
            <Text style={{ marginTop: 20 }}>🔐 Enter key to retrieve value 🔐</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter key"
                value={queryKey}
                onChangeText={text => onChangeQueryKey(text)}
                onSubmitEditing={mostrarTela}
            />

            <View style={styles.container}>
                <Text style={{ color: 'black', marginBottom: 20 }}>Welcome!</Text>
                <Text style={{ marginBottom: 20 }}>Save an item and retrieve it later!</Text>

                {/* Input fields for key and value */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter key"
                    value={key}
                    onChangeText={text => onChangeKey(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter value"
                    value={value}
                    onChangeText={text => onChangeValue(text)}
                />

                {/* Save button */}
                <Button
                    title="Save this key/value pair"
                    onPress={() => {
                        save(key, value);
                        onChangeKey(''); // Reset key input after saving
                        onChangeValue(''); // Reset value input after saving
                    }}
                />

                {/* Input field to retrieve value */}
                <Text style={{ marginTop: 20 }}>🔐 Enter key to retrieve value 🔐</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter key"
                    value={queryKey}
                    onChangeText={text => onChangeQueryKey(text)}
                    onSubmitEditing={mostrarTela}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 20,
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
