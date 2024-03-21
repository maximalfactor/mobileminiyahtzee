import {View} from "react-native"
import { Text } from "react-native-paper"
import styles from "../style/style"

export default function Header() {
    return (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>
            Mini-Yahtzee
        </Text>
    </View>
        
    )
}