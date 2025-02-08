// app/(tabs)/post-bounty.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function PostBountyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post a Bounty</Text>
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