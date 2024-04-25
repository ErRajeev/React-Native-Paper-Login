import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCsxTgGXeEoUTrteftA4NGQaJfP9FdzS8o',
  authDomain: 'native-login-3b059.firebaseapp.com',
  projectId: 'native-login-3b059',
  storageBucket: 'native-login-3b059.appspot.com',
  messagingSenderId: '793060116243',
  appId: '1:793060116243:web:9ccf1b9db9d4d76de07ce6',
  measurementId: 'G-P15R2CF4LF',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
