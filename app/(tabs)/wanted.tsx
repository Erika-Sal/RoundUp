import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { Star, MapPin, Clock, DollarSign, ShieldCheck } from 'lucide-react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { getBounties, BountyData } from './firebase';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MessagingScreen from './messaging';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  WantedList: undefined;
  Messaging: {
    bountyTitle: string;
    otherUser: string;
  };
};

interface AnimatedButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const urgencyColors = {
  High: '#D72638',
  Medium: '#F7B801',
  Low: '#4CAF50',
};

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

function WantedList({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList> }) {
  const [bounties, setBounties] = useState<BountyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fontsLoaded] = useFonts({
    Rye: Rye_400Regular,
  });

  const fetchBounties = async () => {
    console.log('🔄 Fetching bounties...');
    setIsLoading(true);
    try {
      const fetchedBounties = await getBounties();
      console.log('📥 Received bounties:', fetchedBounties);
      setBounties(fetchedBounties);
    } catch (error) {
      console.error('❌ Error fetching bounties:', error);
      Alert.alert('Error', 'Failed to load bounties. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBounties();
  }, []);

  useEffect(() => {
    console.log('🔄 Initial bounties fetch');
    fetchBounties();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('📱 Screen focused, fetching bounties');
      fetchBounties();
      return () => {
        console.log('Screen unfocused');
      };
    }, [])
  );

  const renderBountyCard = ({ item }: { item: BountyData }) => (
    <AnimatedButton 
      onPress={() => {
        console.log('Navigating to Messaging with:', {
          bountyTitle: item.title,
          otherUser: item.sheriff
        });
        navigation.navigate('Messaging', {
          bountyTitle: item.title,
          otherUser: item.sheriff
        });
      }}
    >
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

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{item.description || 'No description provided'}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.sheriffBadge}>
              <ShieldCheck size={16} color="#FFD700" />
              <Text style={styles.sheriffText}>{item.sheriff}</Text>
            </View>

            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => {
            console.log('Claiming bounty:', item.title);
            navigation.navigate('Messaging', {
              bountyTitle: item.title,
              otherUser: item.sheriff
            });
          }}
        >
          <Text style={styles.acceptButtonText}>CLAIM BOUNTY</Text>
        </TouchableOpacity>
      </View>
    </AnimatedButton>
  );

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loader}>
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
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No bounties available</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

export default function WantedListScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WantedList" component={WantedList} />
      <Stack.Screen name="Messaging" component={MessagingScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
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
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
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
    marginRight: 10,
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
    backgroundColor: 'rgba(255, 248, 220, 0.95)',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(139, 69, 19, 0.05)',
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
  },
  descriptionLabel: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: 'Rye',
  },
  descriptionText: {
    fontSize: 14,
    color: '#594433',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sheriffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 6,
  },
  sheriffText: {
    fontSize: 13,
    color: '#8B4513',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
    fontFamily: 'Rye',
    textAlign: 'center',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontFamily: 'Rye',
    fontSize: 18,
    color: '#FFF8DC',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});