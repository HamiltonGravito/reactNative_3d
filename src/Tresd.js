import { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native"
import Canvas from "react-native-canvas"

function Tresd(){

    const ref = useRef(null);
    const [mouseX, setMouseX] = useState(null);
    const [mouseY, setMouseY] = useState(null);
    const [color, setColor] = useState("#FF1010");

    function generateHexColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }

    const handleTouch = (event) => {
        const { locationX } = event.nativeEvent;
        setMouseX(locationX);
        const { locationY } = event.nativeEvent;
        setMouseY(locationY);
        setColor(generateHexColor);
    };

    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(20, 20, 100, 100);
        }
    }, [ref, handleTouch]);


    return (
        <Pressable onPress={handleTouch}>
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Canvas style={styles.canvas} ref={ref} />
                </SafeAreaView>
            </View>
        </Pressable>
    )
}
export default Tresd;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#225544',
        padding: 10
    },
    canvas: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#552244'
    }
});