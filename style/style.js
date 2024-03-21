import { StyleSheet } from 'react-native';
const constants = require("../consts").default;


export default StyleSheet.create({

    genericText: {
        fontFamily: "Consolas"
    },
    header: {
        marginBottom: 25,
        backgroundColor: constants.iconColorPrimary,
        flexDirection: 'row',
    },
    footer: {
        marginTop: 50,
        width: "100%",
        backgroundColor: constants.iconColorPrimary,
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
    },
    headerTitle: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
    },
    author: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    gameboard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gameinfo: {
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        marginTop: 10
    },
    row: {
        marginTop: 20,
        padding: 10
    },
    flex: {
        flexDirection: "row"
    },
    button: {
        padding: 5,
        width: 150,
        alignSelf: "center",
        borderColor: constants.iconColorPrimary,
        borderWidth: 3,
        marginTop: 10
    },
    buttonText: {
        color:"#2B2B52",
        fontSize: 20
    },
    bigIcon: {
        padding: 10,
        alignSelf: "center",
    },
    paragraph: {
        marginHorizontal: 20,
        textAlign: "justify"
    },
    underParagraph: {
        fontWeight: 'bold',
        marginTop: 5,
        marginHorizontal: 20
    },
    titleSecondary: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
        color: "gray"
    },
    gridContainer: {
        marginTop: 10
    }
});