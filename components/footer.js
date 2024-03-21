import {View} from "react-native"
import { Text } from "react-native-paper"
import styles from "../style/style"



export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.author}>
            Made By: Max Nabbvik
            </Text>
        </View>

    )
}