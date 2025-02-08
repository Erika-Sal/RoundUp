// app/(tabs)/profile.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sheriff Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5DC', // Beige background
  },
  text: {
    fontSize: 24,
    color: '#8B4513', // Brown text
  },
});