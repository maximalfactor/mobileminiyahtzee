import {View, Pressable} from "react-native";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../style/style";
import { Row, Col, Container } from "react-native-flex-grid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Text, Button } from "react-native-paper";

const constants = require("../consts").default

let board = [];
export default function Board({route, navigation}) {
    const [remainingRolls, setRemainingRolls] = useState(constants.rollAmount);
    const [status, setStatus] = useState("Roll the dice");
    //const [endOfGameStatus, setGameEndStatus] = useState(false);
    const [playerName, setName] = useState(route.params.playerName);

    const [selectedPoints, setSelectedPoints] = useState(new Array(constants.diceSideCount).fill(-1));
    const [selectedDice, setSelectedDice] = useState(new Array(constants.diceAmount).fill(false));
    const [diceValues, setDiceValues] = useState(new Array(constants.diceAmount).fill(-1));

    const row = [];

    for (let die = 0; die < constants.diceAmount; die++) {
      row.push(
        <Col key={"row" + die}>
            <Pressable 
                
            onPress={() => selectDie(die)}
            >
            <MaterialCommunityIcons
                name={board[die]}
                size={60}
                color={getDieColor(die)}
            >
            </MaterialCommunityIcons>
            </Pressable>
        </Col>
      );
    }

    const selectionRow = [];
    const pointsRow = [];
    for(let selection = 0; selection < constants.diceSideCount; selection++) {
        selectionRow.push(
            <Col key={"col-" + selection}>
                <Pressable 
                onPress={()=>selectPoints(selection)}
                >
                    <MaterialCommunityIcons name={"numeric-" + (selection + 1) + "-box-outline"}
                     size={40} color={selectedPoints[selection] != -1 ?
                    constants.iconColorSecondary : constants.iconColorPrimary}
                    style={{alignSelf: "center"}}/>
                </Pressable>
            </Col>
        )

        pointsRow.push(
            <Col key={"pointsrow-" + selection} >
                <Text style={{textAlign: "center"}}>{selectedPoints[selection] == -1 ? "0" : selectedPoints[selection]}</Text>
            </Col>
        )
    }


    function getDieColor(i) {
        return (selectedDice[i]) ? constants.iconColorSecondary : constants.iconColorPrimary
    }

    function selectDie(i) {
        var tempDiceList = [...selectedDice];
        tempDiceList[i] = !tempDiceList[i];
        setSelectedDice([...tempDiceList]);
    }

    function rollDice() {
        if (selectedPoints.filter(x=>x!=-1).length >= 6) {
            setRemainingRolls(constants.rollAmount);
            setStatus("Roll the dice");
            setSelectedPoints(new Array(constants.diceSideCount).fill(-1));
            setDiceValues(new Array(constants.diceAmount).fill(-1));

            return
        }
        if(remainingRolls < 1) {
            setStatus("Select points before rolling again");
            return
        }

        var tempDiceValues = [...diceValues];

        for(let i in tempDiceValues) {
            if (!(selectedDice[i])) {
                var randomNumber = Math.ceil(Math.random() * constants.diceSideCount);
                board[i] = "dice-" + randomNumber;
                tempDiceValues[i] = randomNumber;
            }
        }
        if(remainingRolls == 1) {
            setStatus("Set points");
        }
        setRemainingRolls(remainingRolls - 1);
        setDiceValues([...tempDiceValues]);
    }

    function selectPoints(i) {
        var tempDiceValues = [...diceValues];
        var tempSelectedPoints = [...selectedPoints];
        
        if(selectedPoints[i] != -1) {
            setStatus("Points for " + (i + 1) + " has already been selected")
            return
        }
        if(remainingRolls != 0) {
            setStatus("Must roll 3 times before setting score");
            return
        }

        var total = tempDiceValues.filter((x) => x==(i+1)).length * (i + 1);

        tempSelectedPoints[i] = total;
        tempDiceValues.fill(-1);

        setDiceValues([...tempDiceValues]);
        setSelectedPoints([...tempSelectedPoints]);
        setSelectedDice(selectedDice.fill(false))

        if(tempSelectedPoints.filter(x=>x!=-1).length >= 6) {
            setStatus("Game complete");
            setRemainingRolls(0);
            return
        }
        setStatus("Roll the dice");
        setRemainingRolls(constants.rollAmount);
    }

    function getSelectedTotal() {
        var total = selectedPoints.filter(x => x!=-1).reduce((sum, a) => sum + a, 0)
        if (total > constants.bonusPointsLimit) {
            return total + " + " + constants.bonusPoints
        }
        return total
    }
    return (
        <View>
            <Header/>
            <Text style={styles.title}>Player: {playerName}
                <Text style={styles.titleSecondary}> Round: {Math.min(selectedPoints.filter(x=>x!=-1).length + 1, 6)}</Text>
            </Text>
            <View>
                { diceValues[0] != -1 ?
                    <Container style={styles.gridContainer}>
                        <Row>
                            {row}
                        </Row>
                    </Container>
                    :
                    <MaterialCommunityIcons color={constants.iconColorPrimary} name="dice-multiple-outline"
                     size={160} style={styles.bigIcon}></MaterialCommunityIcons>
                }
                <Text style={styles.title}>{status}</Text>
                <Text style={styles.titleSecondary}>Rolls left: {remainingRolls}</Text>
                <Button style={styles.button} onPress={rollDice}>{selectedPoints.filter(x=>x!=-1).length >= 6 ? "New Game" : "Roll"}</Button>
                <View style={styles.gridContainer}>
                    <Container>
                        <Row>
                            {pointsRow}
                        </Row>
                        <Row>
                            {selectionRow}
                        </Row>
                    </Container>
                </View>
                
                <Text style={styles.title} >Total: {getSelectedTotal()}</Text>
            </View>
            <Footer/>
        </View>
    )
}