import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import { CircleDollarSign, TrendingUp, ArrowRight, Star, Award, Target } from 'lucide-react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { LinearGradient } from 'expo-linear-gradient';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ButtonProps {
  text: string;
  primary?: boolean;
  icon?: React.ElementType;
  onPress?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <View style={styles.featureCard}>
    <LinearGradient
      colors={['rgba(139, 69, 19, 0.15)', 'rgba(139, 69, 19, 0.05)']}
      style={styles.cardGradient}
    >
      <View style={styles.iconContainer}>
        <Icon size={32} color="#8B4513" />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
      <View style={styles.cardDecoration} />
    </LinearGradient>
  </View>
);

const Button: React.FC<ButtonProps> = ({ text, primary = false, icon: Icon, onPress }) => (
  <TouchableOpacity 
    style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]}
    onPress={onPress || (() => console.log(`Clicked: ${text}`))}
  >
    <LinearGradient
      colors={primary ? ['#8B4513', '#654321'] : ['rgba(255, 248, 220, 0.9)', 'rgba(255, 248, 220, 0.7)']}
      style={styles.buttonGradient}
    >
      <Text style={[styles.buttonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
        {text}
      </Text>
      {Icon && <Icon size={20} color={primary ? "#FFF8DC" : "#8B4513"} style={styles.buttonIcon} />}
    </LinearGradient>
  </TouchableOpacity>
);

export default function Homepage() {
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

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
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(139, 69, 19, 0.6)']}
          style={styles.overlay}
        >
          <View style={styles.container}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.heroContent}>
                <View style={styles.titleContainer}>
                  <View style={styles.starDecoration}>
                    <Star size={24} color="#FFD700" fill="#FFD700" />
                  </View>
                  <Text style={styles.heroTitle}>RoundUp</Text>
                  <View style={styles.starDecoration}>
                    <Star size={24} color="#FFD700" fill="#FFD700" />
                  </View>
                </View>
                <Text style={styles.heroSubtitle}>
                  Jump on the Bandwagon and RoundUp some help!
                </Text>
                <View style={styles.buttonGroup}>
                  <Button text="Saddle Up" primary icon={Target} />
                  <Button text="Scout Ahead" icon={Award} />
                </View>
              </View>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Why Choose Round Up</Text>
              <View style={styles.headerDecoration} />
              <View style={styles.featuresGrid}>
                <FeatureCard
                  icon={CircleDollarSign}
                  title="Post Bounty"
                  description="Need help with a task? Post a bounty and let fellow cowboys lend a hand!"
                />
                <FeatureCard
                  icon={TrendingUp}
                  title="Become a Sheriff"
                  description="Help your fellow townspeople and earn your badge of honor!"
                />
              </View>
            </View>

            {/* CTA Section */}
            <LinearGradient
              colors={['rgba(139, 69, 19, 0.9)', 'rgba(139, 69, 19, 0.7)']}
              style={styles.ctaSection}
            >
              <Text style={styles.ctaTitle}>Round Up Help Today!</Text>
              <View style={styles.ctaDecoration}>
                <Star size={20} color="#FFD700" fill="#FFD700" />
                <View style={styles.ctaLine} />
                <Star size={20} color="#FFD700" fill="#FFD700" />
              </View>
              <Button 
                text="Join the Posse" 
                primary 
                icon={ArrowRight}
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    paddingTop: 44, // For status bar
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 960,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  starDecoration: {
    backgroundColor: 'rgba(139, 69, 19, 0.3)',
    padding: 8,
    borderRadius: 20,
  },
  heroTitle: {
    fontFamily: 'Rye',
    fontSize: 56,
    color: '#FFF8DC',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#FFF8DC',
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  primaryButton: {
    backgroundColor: '#8B4513',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  buttonText: {
    fontFamily: 'Rye',
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#FFF8DC',
  },
  secondaryButtonText: {
    color: '#8B4513',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  featuresSection: {
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerDecoration: {
    width: 120,
    height: 4,
    backgroundColor: '#FFD700',
    marginBottom: 48,
    borderRadius: 2,
  },
  sectionTitle: {
    fontFamily: 'Rye',
    fontSize: 40,
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(255, 248, 220, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    maxWidth: 1200,
    width: '100%',
    paddingHorizontal: 20,
  },
  featureCard: {
    width: width > 768 ? 320 : width * 0.85,
    height: 280,
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    padding: 24,
    height: '100%',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#FDF5E6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  featureTitle: {
    fontFamily: 'Rye',
    fontSize: 24,
    color: '#8B4513',
    marginBottom: 16,
  },
  featureDescription: {
    fontSize: 16,
    color: '#463E3F',
    lineHeight: 24,
  },
  cardDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  ctaSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Rye',
    fontSize: 40,
    color: '#FFF8DC',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  ctaDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  ctaLine: {
    width: 80,
    height: 2,
    backgroundColor: '#FFD700',
  },
});