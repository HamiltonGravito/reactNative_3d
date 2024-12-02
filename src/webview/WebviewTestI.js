import { useEffect, useRef } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

function WebviewTestI(){

    const ref = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        if (ref.current) {
            ref.current.width = screenWidth;
            ref.current.height = screenHeight;
        }
    }, [screenWidth, screenHeight]);


    const graphData = {
        nodes: [
          { id: 1, label: 'Node 1' },
          { id: 2, label: 'Node 2' },
        ],
        edges: [
          { from: 1, to: 2 },
        ],
      };
      const sendDataToWebView = () => {
        const dataString = JSON.stringify(graphData);
        ref.current.postMessage(dataString);
      };

    return(
        <View style={styles.container}>
            <View
                style={styles.body}
            >
                <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    ref={ref}
                    originWhitelist={['*']}
                    source={require('./grafo.html')}
                    javaScriptEnabled={true}
                    onMessage={(event) => {
                        console.log('Mensagem do WebView:', event.nativeEvent.data);
                    }}
                    onLoad={() => {
                        const graphData = JSON.stringify(graphData);
                        ref.current.postMessage(graphData);
                      }}
                    style={{ width: screenWidth, height: screenHeight }}
                />
                <Button title="Enviar Dados para WebView" onPress={sendDataToWebView} />
                </SafeAreaView>
            </View>
        </View>
    );
};
export default WebviewTestI;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
