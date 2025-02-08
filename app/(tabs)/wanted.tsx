import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function WantedListScreen() {
  // Sample bounty data
  const bounties = [
    {
      id: '1',
      title: 'Lost Cattle Recovery',
      type: 'Recovery',
      reward: '500',
      location: 'Dusty Creek',
      posted: '2 hours ago',
      urgency: 'High',
    },
    {
      id: '2',
      title: 'Missing Stagecoach',
      type: 'Investigation',
      reward: '1000',
      location: 'Eagle Pass',
      posted: '1 day ago',
      urgency: 'Medium',
    },
    {
      id: '3',
      title: 'Ranch Hand Needed',
      type: 'Assistance',
      reward: '200',
      location: 'Golden Valley',
      posted: '3 days ago',
      urgency: 'Low',
    },
    // Add more sample bounties as needed
  ];

  const renderBountyCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('Selected bounty:', item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.urgencyBadge, 
          item.urgency === 'High' ? styles.highUrgency :
          item.urgency === 'Medium' ? styles.mediumUrgency :
          styles.lowUrgency
        ]}>
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{item.type}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{item.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Posted:</Text>
          <Text style={styles.value}>{item.posted}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.reward}>${item.reward} REWARD</Text>
        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={() => console.log('Accept bounty:', item.id)}
        >
          <Text style={styles.acceptButtonText}>ACCEPT</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>WANTED</Text>
      </View>

      {/* Bounties List */}
      <FlatList
        data={bounties}
        renderItem={renderBountyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

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
  },
  header: {
    width: '100%',
    backgroundColor: '#8B4513', // brown color
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#8B4513',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  highUrgency: {
    backgroundColor: '#DC2626',
  },
  mediumUrgency: {
    backgroundColor: '#F59E0B',
  },
  lowUrgency: {
    backgroundColor: '#10B981',
  },
  urgencyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardBody: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    width: 80,
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  reward: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  acceptButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rope: {
    position: 'absolute',
    width: 4,
    top: 0,
    bottom: 0,
    backgroundColor: '#8B4513',
    opacity: 0.5,
  },
  ropeLeft: {
    left: '10%',
  },
  ropeRight: {
    right: '10%',
  },
});