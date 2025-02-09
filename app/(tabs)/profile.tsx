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

          {/* Right - Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Users size={40} color="#8B4513" />
              <Text style={styles.statValue}>10</Text>
              <Text style={styles.statLabel}>Helped</Text>
            </View>
            <View style={styles.statBox}>
              <Clock size={40} color="#8B4513" />
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
    padding: 25,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderBottomColor: '#5C2C0C',
  },
  headerText: {
    fontFamily: 'Rye',
    color: '#FFF8DC',
    fontSize: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 40,
    marginTop: 30,
  },
  profileDetails: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#8B4513',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFF8DC',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  avatarPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'black',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 15,
  },
  username: {
    fontFamily: 'Rye',
    fontSize: 28,
    color: '#8B4513',
  },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  trustedText: {
    fontSize: 18,
    color: '#FFF8DC',
    fontWeight: '700',
    marginLeft: 8,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statBox: {
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#8B4513',
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.4,
    elevation: 8,
  },
  statValue: {
    fontFamily: 'Rye',
    fontSize: 32,
    color: '#8B4513',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#594433',
    fontWeight: '700',
    textAlign: 'center',
  },
});
