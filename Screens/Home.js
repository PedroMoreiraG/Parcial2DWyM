import {React, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { getDestinations, deleteDestination } from '../services/Api';

const { width } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        fetchDestinations();
    
        const unsubscribe = navigation.addListener('focus', () => {
          fetchDestinations();
        });
    
        return unsubscribe;
      }, [navigation]);

    const fetchDestinations = async () => {
        const data = await getDestinations();

        const sortedDestinations = data.sort((a, b) => b.favorites - a.favorites);
        setDestinations(sortedDestinations);
    };


    const handleDelete = async (id) => {
        try {
          await deleteDestination(id);
          fetchDestinations(); 
        } catch (error) {
          Alert.alert('Error', 'No se pudo eliminar el destino.');
        }
      };

      const renderTag = (difficulty) => {
        const tagStyles = {
          Fácil: { backgroundColor: '#90ee90' },
          Moderada: { backgroundColor: '#fafad2' },
          Difícil: { backgroundColor: '#9370db' },
        };
        return (
          <Text style={[styles.tag, tagStyles[difficulty]]}>
            {difficulty}
          </Text>
        );
      };


      return (
        <View style={styles.container}>
          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.name}</Text>
                {renderTag(item.difficulty)}
                <Text>{item.description}</Text>
                <View style={styles.topCard}>      
                <Text>🖤  {item.favorites}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddEditDestination', { item })}>
                        <Text style={styles.editButton}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Text style={styles.deleteButton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
                style={[styles.addButton, Platform.OS === 'android' ? styles.androidButton : styles.iosButton]}
                onPress={() => navigation.navigate('AddEditDestination')}
            >
            <Text style={styles.addButtonText}>
                {Platform.OS === 'android' ? 'Agregar Destino' : 'Crear Destino'}
            </Text>
        </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 10, alignItems: 'center' },
      card: { width: width * 0.85, padding: 15, marginVertical: 10, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems:'center' },
      topCard: {justifyContent: 'center',alignItems: 'center', flex: 1},
      title: { fontSize: 15, fontWeight: 'bold' },
      tag: { flex: 1, justifyContent: 'center', alignItems:'center',padding: 5, borderRadius: 5, color: '#f0f0f0', marginVertical: 5, fontWeight: 'bold' },
      editButton: { color: 'blue', marginTop: 10 },
      deleteButton: { color: 'red', marginTop: 10 },
      addButton: { backgroundColor: 'blue', padding: 10, borderRadius: 10, position: 'absolute', bottom: 20, right: 20 },

      androidButton: {left: 0, backgroundColor: 'blue', width: width*0.3,},
      iosButton: {right: 0, backgroundColor: 'green', width: width*0.3,},
    
      addButtonText: {
        color: Platform.OS === 'android' ? 'black' : 'white', 
        textAlign: 'center',
        fontWeight: 'bold',
        
      },
    });


    export default Home;