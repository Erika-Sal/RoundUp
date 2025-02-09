// app/(tabs)/wanted.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function WantedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wanted Board</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');
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