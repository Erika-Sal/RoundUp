import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window'); // Get full screen dimensions

export default function PostBountyScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    console.log({ title, description, reward, deadline });
    setTitle('');
    setDescription('');
    setReward('');
    setDeadline('');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://www.toptal.com/designers/subtlepatterns/uploads/aged_paper.png' }} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.header}>🐂 WANTED! POST A BOUNTY 🐂</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>🐂 WANTED FOR</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter bounty title"
              placeholderTextColor="#704214"
            />

            <Text style={styles.label}>📜DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe what you need help with..."
              placeholderTextColor="#704214"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>💰REWARD ($)</Text>
            <TextInput
              style={styles.input}
              value={reward}
              onChangeText={setReward}
              placeholder="How much will you pay..."
              placeholderTextColor="#704214"
              keyboardType="numeric"
            />

            <Text style={styles.label}>⏳DEADLINE</Text>
            <TextInput
              style={styles.input}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="Enter deadline (YYYY-MM-DD)"
              placeholderTextColor="#704214"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>🔫 POST BOUNTY 🔫</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    color: '#5C4033',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 30,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(235, 199, 131, 0.95)', // Parchment color with slight transparency
    padding: 45,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderWidth: 4,
    borderColor: '#8B4513',
  },
  label: {
    fontSize: 30,
    color: '#8B4513',
    marginBottom: 25,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  input: {
    backgroundColor: '#FFE4B5',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#8B4513',
    marginBottom: 45,
    color: '#5C4033',
    fontFamily: 'serif',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#5C4033',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
