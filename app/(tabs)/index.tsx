import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { CircleDollarSign, Users, TrendingUp, ArrowRight } from 'lucide-react-native';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ButtonProps {
  text: string;
  primary?: boolean;
  icon?: LucideIcon;
}

export default function Homepage() {
  const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
    <View style={styles.featureCard}>
      <View style={styles.iconContainer}>
        <Icon style={styles.icon} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );

  const Button = ({ text, primary = false, icon: Icon }: ButtonProps) => (
    <TouchableOpacity 
      style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]}
      onPress={() => console.log(`Clicked: ${text}`)}
    >
      <Text style={[styles.buttonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
        {text}
      </Text>
      {Icon && <Icon style={styles.buttonIcon} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollView}>
   <ImageBackground 
      source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
        <View style={styles.container}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>RoundUp</Text>
              <Text style={styles.heroSubtitle}>
                Jump on the Bandwagon and RoundUp some help!
              </Text>
              <View style={styles.buttonGroup}>
                <Button text="Saddle Up" primary />
                <Button text="Scout Ahead" />
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Why Choose Round Up</Text>
            <View style={styles.featuresGrid}>
              <FeatureCard
                icon={CircleDollarSign}
                title="Post Bounty"
                description="Need help with homework? Need a Group to Get Groceries With? Need a fake partner so you don't third wheel? Post a 'Bounty' for whatever you need."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Become a Sheriff"
                description="Help your fellow townspeople complete their tasks to level up your profile"
              />
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Round Up Help Today!</Text>
            <Button 
              text="Join the Posse" 
              primary 
              icon={ArrowRight}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  heroSection: {
    paddingTop: 96,
    paddingBottom: 128,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: 960,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Rye',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontFamily: 'Rye',
    fontSize: 20,
    color: '#463E3F',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 640,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B4513',
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
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#8B4513',
  },
  buttonIcon: {
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  featuresSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 96,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Rye',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 64,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 48,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 32,
    borderRadius: 16,
    width: 320,
    borderWidth: 2,
    borderColor: '#8B4513',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FDF5E6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  icon: {
    width: 24,
    height: 24,
    color: '#8B4513',
  },
  featureTitle: {
    fontFamily: 'Rye',
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 16,
  },
  featureDescription: {
    fontSize: 16,
    color: '#463E3F',
    lineHeight: 24,
  },
  ctaSection: {
    paddingVertical: 96,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Rye',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 24,
  },
});