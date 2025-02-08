import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SheriffProfile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sheriff Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Avatar Container */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarInner}>
            <View style={styles.avatarPlaceholder} />
          </View>
        </View>

        {/* Crossing Ropes */}
        <View style={[styles.rope, styles.ropeLeft]} />
        <View style={[styles.rope, styles.ropeRight]} />

        {/* Username and Badge */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>UserName</Text>
          <View style={styles.trustedContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.trustedText}>Trusted</Text>
          </View>
        </View>

        {/* Stats Boxes */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>10 Helped</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statText}>15 Hours</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // amber-50 equivalent
  },
  header: {
    width: '100%',
    backgroundColor: '#8B4513', // brown color
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B4513',
    padding: 8,
    marginTop: 20,
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'black',
  },
  rope: {
    position: 'absolute',
    width: 8,
    backgroundColor: '#D4B483',
    top: 120,
    height: 40,
    transform: [{ rotate: '45deg' }],
  },
  ropeLeft: {
    left: 60,
    transform: [{ rotate: '-45deg' }],
  },
  ropeRight: {
    right: 60,
    transform: [{ rotate: '45deg' }],
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  trustedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starIcon: {
    fontSize: 24,
  },
  trustedText: {
    fontSize: 24,
    color: '#8B4513',
    fontWeight: '500',
  },
  statsContainer: {
    width: '100%',
    gap: 16,
    marginTop: 24,
  },
  statBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  statText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});