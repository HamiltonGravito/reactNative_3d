import { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Canvas from "react-native-canvas";

function CanvasTest() {
    const ref = useRef(null);
    const [mouseX, setMouseX] = useState(10);
    const [mouseY, setMouseY] = useState(10);
    const [color, setColor] = useState("#FF1010");

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    function generateHexColor() {
        return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    }

    const handleTouch = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        setMouseX(locationX);
        setMouseY(locationY);
        setColor(generateHexColor());
    };

    useEffect(() => {
        const draw = async () => {
            if (ref.current) {
                const ctx = await ref.current.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = color;
                    ctx.fillRect(mouseX, mouseY, 50, 50);
                }
            }
        };
        draw();
    }, [mouseX, mouseY, color]);

    useEffect(() => {
        if (ref.current) {
            ref.current.width = screenWidth;
            ref.current.height = screenHeight;
        }
    }, [screenWidth, screenHeight]);

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={() => true}
            onResponderMove={handleTouch}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Canvas
                    style={{ width: screenWidth, height: screenHeight }}
                    ref={ref}
                />
            </SafeAreaView>
        </View>
    );
}

export default CanvasTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#225544',
    },
});
