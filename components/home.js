import {Keyboard, View} from "react-native"
import { useState } from "react"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../style/style"
import { Button, TextInput, Text } from "react-native-paper"

const constants = require("../consts").default


export default function Home({navigation}) {
    const [playerName, setName] = useState("");
    const [tempName, setTempName] = useState("");

    async function sendName() {
        setName(tempName); 
        Keyboard.dismiss();
    }
    
    return (
        <View>
            <Header/>
            {playerName ? (
                <View >
                    <Text style={styles.title}>Rules of the game</Text>

                    
                    <Text multiline="true" style={styles.paragraph}>THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {constants.diceAmount} dice and
                    for the every die you have {constants.rollAmount} rolls. After each roll you can keep dice in
                    order to get same die spot counts as many as
                    possible. In the end of the turn you must select
                    your points from 1 to {constants.diceSideCount}. Game ends when all points have been selected.
                    The order for selecting those is free.
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from
                    1 to {constants.diceSideCount} again.
                    GOAL: To get points as much as possible. {constants.bonusPointsLimit} points is the limit of
                    getting bonus which gives you {constants.bonusPoints} points more.</Text>
                    <Text style={styles.underParagraph}>Good luck {playerName}</Text>
                    <Button mode="outlined" style={styles.button}
                            onPress={()=>navigation.navigate("GameBoard", {"playerName": playerName})}>Play</Button>
                </View>
            ) :
            (
                <View style={{display: (playerName ? "none": "auto")}}>
                    <MaterialCommunityIcons style={styles.bigIcon} name="information-outline" 
                                            size={130} color={constants.iconColorPrimary}/>
                    <Text>Enter your name: {playerName}</Text>
                    <TextInput style={styles.textInput} value={tempName} onChangeText={setTempName} autoFocus={true}></TextInput>
                    <Button mode="outlined" style={styles.button} 
                            onPress={sendName}>Select</Button>
                </View>
            )}
            <Footer/>
        </View>
    )
}