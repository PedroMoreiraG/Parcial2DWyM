import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {getDestinations, addDestination, editDestination } from '../services/Api';

export default function AddEditDestination({ route, navigation }) {
  const [name, setName] = useState(route.params?.item?.name || '');
  const [description, setDescription] = useState(route.params?.item?.description || '');
  const [difficulty, setDifficulty] = useState(route.params?.item?.difficulty || 'Fácil');

  const handleSubmit = async () => {
    try {
      const destination = { name, description, difficulty, favorites: 0 };
      if (route.params?.item) {
        await editDestination(route.params.item.id, destination);
      } else {
        await addDestination(destination);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el destino.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del destino:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Dificultad:</Text>
      <Picker selectedValue={difficulty} onValueChange={setDifficulty}>
        <Picker.Item label="Fácil" value="Fácil" />
        <Picker.Item label="Moderada" value="Moderada" />
        <Picker.Item label="Difícil" value="Difícil" />
      </Picker>
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});

