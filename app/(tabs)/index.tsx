import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CircleDollarSign, Users, TrendingUp, ArrowRight, LucideIcon } from 'lucide-react';
import { Dimensions } from 'react-native';

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
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>RoundUp</Text>
            <Text style={styles.heroSubtitle}>
              Jump on the Bandwagon and RoundUp some help!
            </Text>
            <View style={styles.buttonGroup}>
              <Button text="Get Started" primary />
              <Button text="Learn More" />
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
          <Text style={styles.ctaSubtitle}>
          
          </Text>
          <Button 
            text="Start Your Journey" 
            primary 
            icon={ArrowRight}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#6B7280',
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
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1F2937',
  },
  buttonIcon: {
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  featuresSection: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 96,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
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
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    width: 320,
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
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 24,
    height: 24,
    color: '#2563EB',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  featureDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  ctaSection: {
    paddingVertical: 96,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaSubtitle: {
    fontSize: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 640,
  },
});