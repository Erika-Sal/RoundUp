import { Redirect } from 'expo-router';

export default function Root() {
  // This will redirect to your homepage in the tabs
  return <Redirect href="/(tabs)" />;
}
