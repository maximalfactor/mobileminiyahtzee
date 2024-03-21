import Home from "./components/home";
import Board from "./components/board";
import ScoreBoard from "./components/scoreboard";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {MD3LightTheme, PaperProvider} from "react-native-paper";
import styles from "./style/style"
import { useFonts } from "expo-font"
const constants = require("./consts").default;

const Tab = createBottomTabNavigator();

const customTheme = {
  ...MD3LightTheme,
  fonts: Object.fromEntries(Object.keys(MD3LightTheme.fonts).map((key) =>
    [key, {...MD3LightTheme.fonts[key], fontFamily: "monospace"}]
    )
  )
}



export default function App() {

  return (
      <PaperProvider theme={customTheme}>
      <NavigationContainer>

          <Tab.Navigator sceneContainerStyle={{backgroundColor: "transparent"}} 
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'information': 'information-outline';
                } 
                else if (route.name === 'GameBoard') {
                  iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
                }
                else if (route.name === 'ScoreBoard') {
                  iconName = focused ? 'trophy' : 'trophy-outline';
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: constants.iconColorPrimary,
              tabBarInactiveTintColor: constants.iconColorSecondary,
            })}
          >
            <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}}/>
            <Tab.Screen name="GameBoard" component={Board} />
            <Tab.Screen name="ScoreBoard" component={ScoreBoard} />
          </Tab.Navigator>
  
      </NavigationContainer>
      </PaperProvider>
  );
}




    
