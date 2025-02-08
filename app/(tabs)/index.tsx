import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function BountyHunterNav() {
  const handleClick = (action) => {
    console.log(`Navigating to: ${action}`);
  };

  const NavButton = ({ text }) => (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => handleClick(text)}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Svg width={80} height={80} viewBox="0 0 100 100">
            <Path
              d="M50 10 L90 40 L80 90 L20 90 L10 40 Z"
              fill="black"
            />
            <Path
              d="M30 40 L70 40 L65 70 L35 70 Z"
              fill="tan"
            />
          </Svg>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {['FIND BOUNTY', 'POST A BOUNTY', 'SEARCH USERS', 'MY PROFILE'].map((text) => (
          <NavButton key={text} text={text} />
        ))}
      </View>

      {/* Rope Elements */}
      <View style={[styles.rope, styles.ropeLeft]} />
      <View style={[styles.rope, styles.ropeRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // amber-50 equivalent
    alignItems: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#795548', // brown-700 equivalent
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logoContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    backgroundColor: '#B45309', // amber-700 equivalent
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#B45309', // amber-700 equivalent
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#78350F', // amber-900 equivalent
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  rope: {
    position: 'absolute',
    width: 6,
    top: 0,
    bottom: 0,
    backgroundColor: '#B45309', // amber-700 equivalent
    opacity: 0.5,
  },
  ropeLeft: {
    left: '35%',
  },
  ropeRight: {
    right: '35%',
  },
});