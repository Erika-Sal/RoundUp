import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const SettingItem = ({ icon, title }: { icon: string; title: string }) => (
    <TouchableOpacity style={styles.settingItem}>
      <Ionicons name={icon as any} size={24} color="#007AFF" />
      <Text style={styles.settingText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SettingItem icon="notifications" title="Notifications" />
      <SettingItem icon="lock-closed" title="Privacy" />
      <SettingItem icon="moon" title="Appearance" />
      <SettingItem icon="help-circle" title="Help" />
      <SettingItem icon="information-circle" title="About" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C7C7CC',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
});