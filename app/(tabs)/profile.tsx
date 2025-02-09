import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { Star, Clock, Users, Shield, Award, Target, Medal } from 'lucide-react-native';

interface StatBoxProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface BadgeProps {
  icon: React.ElementType;
  label: string;
}

export default function SheriffProfile() {
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  const StatBox: React.FC<StatBoxProps> = ({ icon: Icon, value, label }) => (
    <View style={styles.statBox}>
      <View style={styles.statIconContainer}>
        <Icon size={32} color="#8B4513" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const Badge: React.FC<BadgeProps> = ({ icon: Icon, label }) => (
    <View style={styles.badgeContainer}>
      <View style={styles.badgeIcon}>
        <Icon size={24} color="#FFD700" />
      </View>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} bounces={false}>
      <ImageBackground 
        source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Shield size={28} color="#FFD700" />
              <Text style={styles.headerText}>Sheriff Profile</Text>
              <Shield size={28} color="#FFD700" />
            </View>
            <View style={styles.headerUnderline} />
          </View>

          {/* Profile Section */}
          <View style={styles.profileContainer}>
            {/* Left - Profile & Trusted Badge */}
            <View style={styles.profileDetails}>
              <View style={styles.avatarOuterContainer}>
                <View style={styles.avatarBorder}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder} />
                  </View>
                </View>
                <View style={styles.rankBadge}>
                  <Star size={24} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.rankText}>Elite</Text>
                </View>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.username}>Sheriff Shreya</Text>
                <View style={styles.trustedBadge}>
                  <Star size={24} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.trustedText}>Most Trusted</Text>
                </View>
              </View>
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <Text style={styles.statsTitle}>Sheriff Stats</Text>
              <View style={styles.statsContainer}>
                <StatBox icon={Users} value="124" label="Citizens Helped" />
                <StatBox icon={Clock} value="256" label="Hours Served" />
              </View>
            </View>

            {/* Badges Section */}
            <View style={styles.badgesSection}>
              <Text style={styles.badgesTitle}>Badges Earned</Text>
              <View style={styles.badgesContainer}>
                <Badge icon={Star} label="Top Deputy" />
                <Badge icon={Award} label="Quick Draw" />
                <Badge icon={Target} label="Sharpshooter" />
                <Badge icon={Medal} label="Town Hero" />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
  overlay: {
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#8B4513',
    paddingTop: Platform.OS === 'ios' ? 60 : 25,
    paddingBottom: 25,
    borderBottomWidth: 6,
    borderBottomColor: '#5C2C0C',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  headerText: {
    fontFamily: 'Rye',
    color: '#FFF8DC',
    fontSize: 36,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerUnderline: {
    width: 180,
    height: 3,
    backgroundColor: '#FFD700',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 1.5,
  },
  profileContainer: {
    padding: 24,
  },
  profileDetails: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarOuterContainer: {
    marginBottom: 20,
  },
  avatarBorder: {
    padding: 3,
    backgroundColor: '#8B4513',
    borderRadius: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#FFF8DC',
    borderRadius: 100,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 96,
    backgroundColor: '#463E3F',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -15,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rankText: {
    color: '#FFD700',
    fontFamily: 'Rye',
    fontSize: 16,
  },
  userInfo: {
    alignItems: 'center',
    gap: 12,
  },
  username: {
    fontFamily: 'Rye',
    fontSize: 32,
    color: '#8B4513',
    textShadowColor: 'rgba(255, 248, 220, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  trustedText: {
    fontSize: 18,
    color: '#FFF8DC',
    fontFamily: 'Rye',
  },
  statsSection: {
    marginBottom: 40,
  },
  statsTitle: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(255, 248, 220, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  statBox: {
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: width > 500 ? 200 : (width - 68) / 2,
    borderWidth: 2,
    borderColor: '#8B4513',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  statIconContainer: {
    backgroundColor: '#FDF5E6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  statValue: {
    fontFamily: 'Rye',
    fontSize: 28,
    color: '#8B4513',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#594433',
    fontWeight: '600',
    textAlign: 'center',
  },
  badgesSection: {
    marginBottom: 24,
  },
  badgesTitle: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(255, 248, 220, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  badgeContainer: {
    backgroundColor: '#8B4513',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: (width - 80) / 2,
    maxWidth: 160,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeIcon: {
    backgroundColor: 'rgba(255, 248, 220, 0.1)',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  badgeText: {
    color: '#FFF8DC',
    fontFamily: 'Rye',
    fontSize: 14,
    textAlign: 'center',
  },
});