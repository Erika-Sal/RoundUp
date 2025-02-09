import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Star, MapPin, Clock, DollarSign, ShieldCheck } from 'lucide-react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';

export default function WantedListScreen() {
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  const bounties = [
    {
      id: '1',
      title: 'Lost Cattle Recovery',
      type: 'Recovery',
      reward: '500',
      location: 'Dusty Creek',
      posted: '2 hours ago',
      urgency: 'High',
      sheriff: 'Sheriff Thompson'
    },
    {
      id: '2',
      title: 'Missing Stagecoach',
      type: 'Investigation',
      reward: '1000',
      location: 'Eagle Pass',
      posted: '1 day ago',
      urgency: 'Medium',
      sheriff: 'Sheriff Wilson'
    },
    {
      id: '3',
      title: 'Missing Kid',
      type: 'Kidnapping',
      reward: '10',
      location: 'Jester',
      posted: '10 seconds ago',
      urgency: 'Low',
      sheriff: 'Sheriff Wilson'
    }
  ];

  const urgencyColors = {
    High: '#D72638',
    Medium: '#F7B801',
    Low: '#4CAF50',
  };

  const AnimatedButton = ({ children, onPress }) => {
    const scale = useSharedValue(1);
    return (
      <Animated.View
        style={{ transform: [{ scale }] }}
        onTouchStart={() => (scale.value = withSpring(0.9))}
        onTouchEnd={() => {
          scale.value = withSpring(1);
          onPress();
        }}
      >
        {children}
      </Animated.View>
    );
  };

  const renderBountyCard = ({ item }) => (
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
            <Text style={styles.timeText}>{item.posted}</Text>
          </View>
          <View style={styles.detailRow}>
            <ShieldCheck size={16} color="#FFD700" />
            <Text style={styles.sheriffText}>{item.sheriff}</Text>
          </View>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>CLAIM BOUNTY</Text>
        </TouchableOpacity>
      </View>
    </AnimatedButton>
  );

  return (
    <ImageBackground source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>BOUNTY BOARD</Text>
          <View style={styles.headerUnderline} />
        </View>

        <FlatList
          data={bounties}
          renderItem={renderBountyCard}
          keyExtractor={(item) => item.id.toString()}
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