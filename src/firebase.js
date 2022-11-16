import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBDe9ZLgmSW9FYDrpmNCH5uKfPKC3a9w3o',
	authDomain: 'edumates---graduation-project.firebaseapp.com',
	projectId: 'edumates---graduation-project',
	storageBucket: 'edumates---graduation-project.appspot.com',
	messagingSenderId: '590689932589',
	appId: '1:590689932589:web:ce4a5b770c5912d470efa4',
	measurementId: 'G-HCE4ZESMLN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Export Auth
export const auth = getAuth();

// Create a root reference for Storage
export const storage = getStorage();

// Create Database
export const db = getFirestore();
