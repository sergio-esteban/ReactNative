import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  loadingText: {
    color: '#512DA8',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // horizontal: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   padding: 10
  // }
});

export const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color="#512DA8" />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View >
  );
}