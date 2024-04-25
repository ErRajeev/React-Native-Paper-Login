import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const auth = FIREBASE_AUTH;

  const handelLogin = () => {
    if (!email) {
      console.log('Please enter you mail');
      return;
    }
    if (!password) {
      console.log('Please enter you password');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User Loged in');
      })
      .catch(error => {
        console.log(error.code);
        switch (error.code) {
          case 'auth/invalid-credential':
            setMessage('Invalid User Credential');
            break;
          case 'auth/invalid-email':
            setMessage('No User with this email');
            break;
          default:
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text variant="displayMedium">Welcome</Text>
        <Text variant="displayMedium">User</Text>
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button icon="login" mode="contained" onPress={handelLogin}>
          Press me
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 10,
  },
});
