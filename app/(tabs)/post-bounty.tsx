import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';

export default function PostBountyScreen() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  const handleSubmit = () => {
    console.log('Submitting bounty:', { title, type, description });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.wantedText}>WANTED</Text>
            <Text style={styles.deadOrAliveText}>DEAD OR ALIVE</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Title Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>WANTED FOR</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="State the offense..."
                placeholderTextColor="rgba(139, 69, 19, 0.5)"
              />
            </View>

            {/* Reward Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>REWARD</Text>
              <View style={styles.rewardContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={[styles.input, styles.rewardInput]}
                  value={type}
                  onChangeText={setType}
                  placeholder="Enter reward amount"
                  placeholderTextColor="rgba(139, 69, 19, 0.5)"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>DESCRIPTION</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Provide detailed description of the wanted individual..."
                placeholderTextColor="rgba(139, 69, 19, 0.5)"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>POST BOUNTY</Text>
          </TouchableOpacity>

          {/* Footer Text */}
          <Text style={styles.footerText}>By order of the Sheriff</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  wantedText: {
    fontFamily: 'Rye',
    fontSize: 48,
    color: '#8B4513',
    textAlign: 'center',
    letterSpacing: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  deadOrAliveText: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    marginTop: 10,
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Rye',
    marginBottom: 8,
    color: '#8B4513',
    textAlign: 'center',
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 248, 220, 0.7)',
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#8B4513',
    fontFamily: 'Rye',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    marginRight: 8,
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rewardInput: {
    flex: 1,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'rgba(139, 69, 19, 0.9)',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#5C2C0C',
  },
  submitButtonText: {
    color: '#FDF5E6',
    fontSize: 24,
    fontFamily: 'Rye',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  footerText: {
    fontFamily: 'Rye',
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  }
});