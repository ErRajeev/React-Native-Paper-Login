import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Home</Text>
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
