import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Reacts, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { StackParamList } from "./global";
import { app } from "./src/firebase/config";
import { HomeScreen, LoginScreen, RegistrationScreen } from "./src/screens";
import ClozemasterScreen from "./src/screens/Clozemaster";
import { SplashScreen } from "./src/screens/SplashScreen";
import AddSubscriptionsInterestScreen from "./src/screens/AddSubscriptionsInterest";
import { StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import AddSubscriptionsKeyWordScreen from "./src/screens/AddSubscriptionsKeyWord";
import AddArticlesScreen from "./src/screens/Articles";
import ArticlesScreen from "./src/screens/Articles";
import SubscriptionsScreen from "./src/screens/Subscriptions";
import ArticleView from "./src/screens/ArticleView";
import SettingsScreen from "./src/screens/Settings";

const TabNav = createBottomTabNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<StackParamList>();

function AddSubscriptionsTabs(props: any) {
  return (
    <TabNav.Navigator>
      <TabNav.Screen
        name="AddKeyWord"
        component={AddSubscriptionsKeyWordScreen}
        options={{ headerShown: false, title: "Add a Key Word"}}
      />
      <TabNav.Screen
        name="AddInterest"
        component={AddSubscriptionsInterestScreen}
        options={{ headerShown: false, title: "Add an interest"}}
      />
    </TabNav.Navigator>
  );
}

function SubscriptionsStack(props: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SubscriptionsScreen"
        component={SubscriptionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSubscriptionsTabs"
        component={AddSubscriptionsTabs}
        options={({ headerShown: false, title: "Add a subscription" })}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props: any) {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleView"
        component={ArticleView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function Home(props: any) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Subscriptions" component={SubscriptionsStack} />
      <Drawer.Screen
        name="AddSubscriptionsTabs"
        component={AddSubscriptionsTabs}
        options={({ title: "Add a subscription" })}
      />
      <Drawer.Screen name="ClozemasterScreen" component={ClozemasterScreen} />
      <Drawer.Screen name="ArticlesStack" component={ArticlesStack} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
export default function App() {
  console.log(app.name, "has rebooted");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getAuth().currentUser);
  
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  });

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
