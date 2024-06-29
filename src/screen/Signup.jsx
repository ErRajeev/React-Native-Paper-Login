import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Text, Button, Portal, Dialog} from 'react-native-paper';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    if (!email) {
      setMessage('Please Enter Email.');
      setVisible(true);
      return;
    }
    if (!password) {
      setMessage('Please Enter Password.');
      setVisible(true);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // console.log(response.user);
      if (response.user) {
        await sendEmailVerification(response.user);
        setMessage('Please check your email to verify your account!');
        setVisible(true);

        setTimeout(() => {
          navigation.navigate('Login');
        }, 5000);
      }
    } catch (error) {
      let newMessage = 'Something went wrong. Please try again.';
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            newMessage = 'Invalid email format.';
            break;
          case 'auth/email-already-in-use':
            newMessage = 'Email already in use.';
            break;
          case 'auth/weak-password':
            newMessage = 'Password should be at least 6 characters.';
            break;
          default:
            newMessage = 'something went wrong.';
            break;
        }
      }
      setMessage(newMessage);
      setVisible(true);
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
      {visible && <LoginErrorDialog />}
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
        <Button icon="login" mode="contained" onPress={handleSignup}>
          Sign Up
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
