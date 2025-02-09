import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, ImageBackground, Dimensions, Alert } from 'react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { DollarSign, Send, AlertCircle } from 'lucide-react-native';
import { addBounty } from './firebase';
import { useNavigation } from '@react-navigation/native';

export default function PostBountyScreen() {
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  const handleSubmit = async () => {
    console.log('Submit button pressed');
    console.log('Current values:', { title, reward, description });

    if (!title || !description) {
      console.log('Missing required fields');
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting to add bounty to Firebase...');
      const bountyData = {
        title,
        reward,
        description,
        type: 'General' as const,
        location: 'Not specified' as const,
        urgency: 'Medium' as const,
        sheriff: 'Anonymous Sheriff' as const
      };
      
      console.log('Bounty data to be submitted:', bountyData);
      
      const result = await addBounty(bountyData);
      console.log('Bounty added successfully with ID:', result);
      
      Alert.alert(
        'Success',
        'Bounty posted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Clearing form and navigating back');
              setTitle('');
              setReward('');
              setDescription('');
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error: unknown) {
      console.error('Error adding bounty:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert('Error', `Failed to post bounty. Please try again. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerIconContainer}>
                <AlertCircle size={32} color="#FFD700" />
              </View>
              <Text style={styles.wantedText}>POST BOUNTY</Text>
              <Text style={styles.deadOrAliveText}>ASK FOR HELP</Text>
              <View style={styles.headerUnderline} />
            </View>

            {/* Two Column Layout */}
            <View style={styles.columnContainer}>
              {/* Left Column */}
              <View style={styles.leftColumn}>
                {/* Title Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>WANTED FOR</Text>
                  <View style={styles.decoratedInput}>
                    <TextInput
                      style={[styles.input, { height: 100 }]}
                      value={title}
                      onChangeText={setTitle}
                      placeholder="State the task..."
                      placeholderTextColor="rgba(139, 69, 19, 0.5)"
                    />
                  </View>
                </View>

                {/* Reward Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>REWARD</Text>
                  <View style={styles.decoratedInput}>
                    <View style={styles.dollarIconContainer}>
                      <DollarSign size={24} color="#8B4513" />
                    </View>
                    <TextInput
                      style={[styles.input, styles.rewardInput, { height: 100 }]}
                      value={reward}
                      onChangeText={setReward}
                      placeholder="Amount"
                      placeholderTextColor="rgba(139, 69, 19, 0.5)"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                <Text style={styles.label}>DESCRIPTION</Text>
                <View style={[styles.decoratedInput, { height: 290 }]}>
                  <TextInput
                    style={[styles.input, { height: '100%' }]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Provide detailed description..."
                    placeholderTextColor="rgba(139, 69, 19, 0.5)"
                    multiline
                    numberOfLines={10}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>POST BOUNTY</Text>
              <Send size={24} color="#FDF5E6" />
            </TouchableOpacity>

            {/* Footer Text */}
            <Text style={styles.footerText}>By order of the Sheriff</Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(139, 69, 19, 0.15)',
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
    marginBottom: 40,
    marginTop: 20,
  },
  headerIconContainer: {
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  headerUnderline: {
    width: 120,
    height: 3,
    backgroundColor: '#FFD700',
    marginTop: 16,
    borderRadius: 1.5,
  },
  wantedText: {
    fontFamily: 'Rye',
    fontSize: 48,
    color: '#8B4513',
    textAlign: 'center',
    letterSpacing: 4,
    textShadowColor: '#FFF8DC',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  deadOrAliveText: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    marginTop: 10,
    letterSpacing: 2,
    textShadowColor: '#FFF8DC',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  columnContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 20,
  },
  leftColumn: {
    flex: 1,
    gap: 20,
  },
  rightColumn: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Rye',
    marginBottom: 12,
    color: '#8B4513',
    textShadowColor: '#FFF8DC',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    width: '100%',
  },
  decoratedInput: {
    backgroundColor: 'rgba(255, 248, 220, 0.9)',
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#8B4513',
    fontFamily: 'Rye',
    textAlign: 'center',
  },
  dollarIconContainer: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  rewardInput: {
    paddingLeft: 48,
  },
  submitButton: {
    backgroundColor: '#8B4513',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  submitButtonText: {
    color: '#FDF5E6',
    fontSize: 24,
    fontFamily: 'Rye',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footerText: {
    fontFamily: 'Rye',
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    textShadowColor: '#FFF8DC',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  }
});