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
          { id: "1", label: "Node 1", size: 15, color: "green" },
          { id: "2", label: "Node 2", size: 20, color: "blue" },
          { id: "3", label: "Node 3", size: 25, color: "red" },
        ],
        edges: [
          { from: "1", to: "2", size: 2, color: "gray" },
          { from: "2", to: "3", size: 3, color: "black" },
        ],
      };

    const sendDataToWebView = () => {
        const dataString = JSON.stringify(graphData);
        if (ref.current) {
            ref.current.postMessage(dataString);
        }
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
                    allowFileAccess={true} // Permite acesso a arquivos locais
                    allowUniversalAccessFromFileURLs={true} 
                    javaScriptEnabled={true}
                    onMessage={(event) => {
                        console.log('Mensagem do WebView:', event.nativeEvent.data);
                    }}
                    onLoad={() => {
                        sendDataToWebView();
                      }}
                    style={{ width: screenWidth, height: screenHeight }}
                />
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
