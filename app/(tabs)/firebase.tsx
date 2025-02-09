import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqrT44r4Mnvba1QNb232cRM3d9qKZBPYI",
    authDomain: "roundup-d3235.firebaseapp.com",
    projectId: "roundup-d3235",
    storageBucket: "roundup-d3235.firebasestorage.app",
    messagingSenderId: "407432880824",
    appId: "1:407432880824:web:59ae703ca1ebdc5bbfca4d",
    measurementId: "G-9TS75F1KJJ"
  };
 

console.log('Starting Firebase initialization...');

let app;
let db;

try {
  console.log('Attempting to initialize Firebase with config:', { 
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain 
  });
  
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (error) {
  console.error('❌ CRITICAL: Error initializing Firebase:', error);
  throw error;
}

export type UrgencyLevel = 'High' | 'Medium' | 'Low';

export interface BountyData {
  id: string;
  title: string;
  type: string;
  reward: string;
  location: string;
  posted: string;
  urgency: UrgencyLevel;
  sheriff: string;
  description: string;
}

export const addBounty = async (bountyData: Omit<BountyData, 'id' | 'posted'>) => {
  console.log('📝 addBounty called with data:', bountyData);
  
  if (!db) {
    console.error('❌ Firestore not initialized');
    throw new Error('Firestore is not initialized');
  }

  try {
    console.log('Creating collection reference...');
    const bountiesRef = collection(db, 'bounties');
    console.log('Collection reference created successfully');
    
    const dataToAdd = {
      ...bountyData,
      posted: new Date().toISOString(),
    };
    console.log('Prepared data for Firebase:', dataToAdd);

    console.log('Attempting to add document to Firestore...');
    const docRef = await addDoc(bountiesRef, dataToAdd);
    console.log('✅ Document successfully written with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Error in addBounty:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
};

export const getBounties = async () => {
  console.log('📥 Fetching bounties...');
  
  if (!db) {
    console.error('❌ Firestore not initialized');
    throw new Error('Firestore is not initialized');
  }

  try {
    const q = query(collection(db, 'bounties'), orderBy('posted', 'desc'));
    console.log('Query created, executing...');
    
    const querySnapshot = await getDocs(q);
    console.log(`✅ Fetched ${querySnapshot.size} bounties`);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      } as BountyData;
    });
  } catch (error) {
    console.error('❌ Error in getBounties:', error);
    throw error;
  }
};