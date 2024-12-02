import { useEffect, useRef } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

function WebviewTestI(){

    const ref = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    console.log(screenHeight);

    useEffect(() => {
        if (ref.current) {
            ref.current.width = screenWidth;
            ref.current.height = screenHeight;
        }
    }, [screenWidth, screenHeight]);


    const htmlContent = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Quick Sigma.js Example</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </head>
    <body style="background-color:#255;">
        <div id="container" style="width: 100%; height: 2000px"></div>
        <script>
        // Create a graphology graph
        const graph = new graphology.Graph();
        graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
        graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
        graph.addEdge("1", "2", { size: 5, color: "purple" });

        // Instantiate sigma.js and render the graph
        const sigmaInstance = new Sigma(graph, document.getElementById("container"));
        </script>
    </body>
    </html>
  `;

    return(
        <View style={styles.container}>
            <View
                style={styles.body}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: htmlContent }}
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
