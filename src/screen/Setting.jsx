import {StyleSheet, View} from 'react-native';
import React from 'react';
import {signOut} from 'firebase/auth';
import {Button, Text} from 'react-native-paper';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function Setting() {
  const auth = FIREBASE_AUTH;

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout Succsessfully');
      })
      .catch(error => {
        console.log(error.code);
      });
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Setting</Text>
      <Button icon="logout" mode="contained-tonal" onPress={handleSignout}>
        Signout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
