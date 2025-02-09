import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { Star, Clock, Users } from 'lucide-react-native';

export default function SheriffProfile() {
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sheriff Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          
          {/* Left - Profile & Trusted Badge */}
          <View style={styles.profileDetails}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>UserName</Text>
              <View style={styles.trustedBadge}>
                <Star size={28} color="#FFD700" fill="#FFD700" />
                <Text style={styles.trustedText}>Trusted</Text>
              </View>
            </View>
          </View>

          {/* Right - Stacked Wide Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Users size={45} color="#8B4513" />
              <Text style={styles.statValue}>10</Text>
              <Text style={styles.statLabel}>Helped</Text>
            </View>
            <View style={styles.statBox}>
              <Clock size={45} color="#8B4513" />
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
          </View>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
  },
  header: {
    padding: 30,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderBottomColor: '#5C2C0C',
  },
  headerText: {
    fontFamily: 'Rye',
    color: '#FFF8DC',
    fontSize: 42,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 40,
    marginTop: 30,
  },
  profileDetails: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#8B4513',
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#FFF8DC',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  avatarPlaceholder: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'black',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 15,
  },
  username: {
    fontFamily: 'Rye',
    fontSize: 30,
    color: '#8B4513',
  },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  trustedText: {
    fontSize: 20,
    color: '#FFF8DC',
    fontWeight: '700',
    marginLeft: 8,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column', // Stacks the boxes vertically
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  statBox: {
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#8B4513',
    width: '100%', // Makes it as wide as possible
    maxWidth: 300, // Ensures it doesn't become too large on bigger screens
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.4,
    elevation: 8,
  },
  statValue: {
    fontFamily: 'Rye',
    fontSize: 34,
    color: '#8B4513',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 18,
    color: '#594433',
    fontWeight: '700',
    textAlign: 'center',
  },
});
