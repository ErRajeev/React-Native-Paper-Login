import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Dialog, Portal} from 'react-native-paper';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    if (!email) {
      setMessage('Please enter your email');
      setVisible(true);
      return;
    }
    if (!password) {
      setMessage('Please enter your password');
      setVisible(true);
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!response.user.emailVerified) {
        setMessage('Please Verify Your Email');
        await sendEmailVerification(response.user);
      }
      // console.log('sdfg');
      // navigation.navigate('MyComponent');
    } catch (error) {
      let newMessage = 'Something went wrong. Please try again.';
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            newMessage = 'The email address is invalid.';
            break;
          case 'auth/user-disabled':
            newMessage = 'The user account has been disabled.';
            break;
          case 'auth/user-not-found':
            newMessage = 'No user found with this email.';
            break;
          case 'auth/invalid-credential':
            newMessage = 'invalid Email or password. Please try again.';
            break;
          case 'auth/too-many-requests':
            newMessage = 'Too many attempts. Please try again later.';
            break;
          default:
            newMessage = 'something went wrong.';
            break;
        }
      }
      setMessage(newMessage);
    }
  };

  const hideDialog = () => setVisible(false);

  const LoginErrorDialog = () => (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text variant="displayMedium">Welcome</Text>
        <Text variant="displayMedium">Back</Text>
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
        <Button icon="login" mode="contained" onPress={handleLogin}>
          Login
        </Button>
        {visible && <LoginErrorDialog />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
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
