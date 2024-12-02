import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CanvasTest from './src/canvas/CanvasTest';
import WebviewTestI from './src/webview/WebviewTestI';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CanvasTest /> */}
      <WebviewTestI />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
