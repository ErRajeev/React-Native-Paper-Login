import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import Home from './src/screen/Home';
import MainPage from './src/MainPage';
import {FIREBASE_AUTH} from './FirebaseConfig';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const ThemedApp = ({user}) => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="MainPage" component={MainPage} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App = () => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, []);

  return <ThemedApp user={user} />;
};

const styles = StyleSheet.create({});
