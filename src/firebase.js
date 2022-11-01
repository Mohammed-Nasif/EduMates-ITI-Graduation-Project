import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD9PjiLIO849v8eeakl_V4ksTEZsu5Q6Ns',
	authDomain: 'graduation-project-f3b56.firebaseapp.com',
	projectId: 'graduation-project-f3b56',
	storageBucket: 'graduation-project-f3b56.appspot.com',
	messagingSenderId: '247920969780',
	appId: '1:247920969780:web:dfae377fc35e2c3f716261',
	measurementId: 'G-GGSTLWHD4T',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Export Auth
export const auth = getAuth();

// Create a root reference for Storage
export const storage = getStorage();

// Create Database
export const db = getFirestore();
