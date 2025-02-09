import React, { useState, useCallback } from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 FlatList,
 ImageBackground,
 KeyboardAvoidingView,
 Platform,
 Alert
} from 'react-native';
import { useFonts, Rye_400Regular } from '@expo-google-fonts/rye';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';


// Define Message interface
interface Message {
 id: string;
 text: string;
 sender: 'user' | 'other';
 timestamp: Date;
}


// Define route params type
type RootStackParamList = {
 Messaging: {
   bountyTitle: string;
   otherUser: string;
 };
};


export default function MessagingScreen() {
 // Use navigation and route hooks
 const navigation = useNavigation();
 const route = useRoute<RouteProp<RootStackParamList, 'Messaging'>>();
  // Safely extract parameters from route
 const { bountyTitle = '', otherUser = 'Sheriff Alice' } = route.params || {};


 // State for messages and input
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState<Message[]>([
   {
     id: '1',
     text: `Hi, I'm interested in your bounty. ${bountyTitle}`,
     sender: 'user',
     timestamp: new Date()
   },
  ]);




 // Load custom font
 const [fontsLoaded] = useFonts({
   Rye: Rye_400Regular,
 });


 // Send message function
 const sendMessage = useCallback(() => {
   if (message.trim()) {
     const newMessage: Message = {
       id: String(messages.length + 1),
       text: message.trim(),
       sender: 'user',
       timestamp: new Date()
     };


     setMessages(prevMessages => [newMessage, ...prevMessages]);
     setMessage('');
   }
 }, [message, messages]);


 // Render individual message
 const renderMessage = ({ item }: { item: Message }) => (
   <View style={[
     styles.messageContainer,
     item.sender === 'user' ? styles.userMessage : styles.otherMessage
   ]}>
     <Text style={styles.messageText}>{item.text}</Text>
   </View>
 );


 // If fonts not loaded, return null
 if (!fontsLoaded) {
   return null;
 }


 return (
   <ImageBackground
     source={{ uri: 'https://live.staticflickr.com/44/167285658_08b8a344bd_h.jpg' }}
     style={styles.background}
   >
     <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>
         <TouchableOpacity
           style={styles.backButton}
           onPress={() => navigation.goBack()}
         >
           <ArrowLeft size={24} color="#FFF8DC" />
         </TouchableOpacity>
         <View style={styles.headerTitleContainer}>
           <Text style={styles.headerTitle}>{otherUser}</Text>
           <Text style={styles.subHeaderTitle}>Bounty: {bountyTitle}</Text>
         </View>
       </View>


       {/* Messages List */}
       <FlatList
         data={messages}
         renderItem={renderMessage}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.messagesList}
         inverted
       />


       {/* Message Input */}
       <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.inputContainer}
       >
         <TextInput
           style={styles.input}
           value={message}
           onChangeText={setMessage}
           placeholder="Type your message..."
           placeholderTextColor="rgba(139, 69, 19, 0.5)"
           multiline
         />
         <TouchableOpacity
           style={styles.sendButton}
           onPress={sendMessage}
         >
           <Send size={24} color="#FFF8DC" />
         </TouchableOpacity>
       </KeyboardAvoidingView>
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
 header: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#8B4513',
   paddingVertical: 15,
   paddingHorizontal: 20,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
 },
 backButton: {
   marginRight: 15,
 },
 headerTitleContainer: {
   flex: 1,
 },
 headerTitle: {
   fontFamily: 'Rye',
   fontSize: 24,
   color: '#FFF8DC',
 },
 subHeaderTitle: {
   fontFamily: 'Rye',
   fontSize: 14,
   color: 'rgba(255, 248, 220, 0.7)',
 },
 messagesList: {
   paddingHorizontal: 20,
   paddingVertical: 10,
 },
 messageContainer: {
   maxWidth: '80%',
   marginVertical: 5,
   padding: 10,
   borderRadius: 10,
 },
 userMessage: {
   alignSelf: 'flex-end',
   backgroundColor: '#8B4513',
 },
 otherMessage: {
   alignSelf: 'flex-start',
   backgroundColor: 'rgba(255, 248, 220, 0.9)',
 },
 messageText: {
   color: '#FFF8DC',
 },
 inputContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: 'rgba(139, 69, 19, 0.8)',
   paddingVertical: 10,
   paddingHorizontal: 20,
 },
 input: {
   flex: 1,
   backgroundColor: 'rgba(255, 248, 220, 0.9)',
   borderRadius: 20,
   paddingHorizontal: 15,
   paddingVertical: 10,
   marginRight: 10,
   maxHeight: 100,
 },
 sendButton: {
   backgroundColor: '#8B4513',
   borderRadius: 25,
   width: 50,
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
 },
});

