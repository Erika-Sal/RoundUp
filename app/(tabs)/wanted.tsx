import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Star, MapPin, Clock, DollarSign, ShieldCheck } from 'lucide-react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { getBounties, BountyData } from './firebase';
import { useFocusEffect } from '@react-navigation/native';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onPress }) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function WantedListScreen() {
  const [bounties, setBounties] = useState<BountyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  const urgencyColors = {
    High: '#D72638',
    Medium: '#F7B801',
    Low: '#4CAF50',
  };

  const fetchBounties = async () => {
    try {
      const fetchedBounties = await getBounties();
      setBounties(fetchedBounties);
    } catch (error) {
      console.error('Error fetching bounties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh bounties when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchBounties();
    }, [])
  );

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - postedDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const renderBountyCard = ({ item }: { item: BountyData }) => (
    <AnimatedButton onPress={() => console.log('Selected bounty:', item.id)}>
      <View style={styles.card}>
        <View style={[styles.urgencyBadge, { backgroundColor: urgencyColors[item.urgency] }]}>
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>

        <View style={styles.cardHeader}>
          <View style={styles.rewardBadge}>
            <DollarSign size={16} color="#8B4513" />
            <Text style={styles.rewardText}>{item.reward}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.titleText}>{item.title}</Text>

          <View style={styles.detailRow}>
            <MapPin size={16} color="#8B4513" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock size={16} color="#8B4513" />
            <Text style={styles.timeText}>{formatTimeAgo(item.posted)}</Text>
          </View>
          <View style={styles.detailRow}>
            <ShieldCheck size={16} color="#FFD700" />
            <Text style={styles.sheriffText}>{item.sheriff}</Text>
          </View>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={() => console.log('Claiming bounty:', item.id)}
        >
          <Text style={styles.acceptButtonText}>CLAIM BOUNTY</Text>
        </TouchableOpacity>
      </View>
    </AnimatedButton>
  );

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>BOUNTY BOARD</Text>
          <View style={styles.headerUnderline} />
        </View>

        <FlatList
          data={bounties}
          renderItem={renderBountyCard}
          keyExtractor={(item: BountyData) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#8B4513',
    borderBottomWidth: 4,
    borderBottomColor: '#5C2C0C',
  },
  headerText: {
    fontFamily: 'Rye',
    fontSize: 36,
    color: '#FFF8DC',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerUnderline: {
    width: '60%',
    height: 2,
    backgroundColor: '#D4A867',
    marginTop: 8,
  },
  listContainer: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 3,
    borderColor: '#8B4513',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
    position: 'relative',
    width: Dimensions.get('window').width / 2 - 24,
    marginBottom: 16,
  },
  urgencyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 12,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8E5D1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginLeft: 4,
  },
  cardContent: {
    gap: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#594433',
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  sheriffText: {
    fontSize: 13,
    color: '#8B4513',
    fontWeight: '500',
  },
  typeBadge: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  typeText: {
    color: '#FFF8DC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  acceptButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});