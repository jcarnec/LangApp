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
import AddSubscriptionsScreen from "./src/screens/AddSubscriptions";
import { StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import AddArticlesScreen from "./src/screens/Articles";
import ArticlesScreen from "./src/screens/Articles";
import ArticleView from "./src/screens/ArticleView";
import SettingsScreen from "./src/screens/Settings";
import settingsReducer from "./src/redux/reducers";
import DrawerContent from "./src/screens/DrawerContent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import axios from "axios";
import { getLanguagePairUrl } from "./src/screens/AddSubscriptions/api";
import {
  changeLearningAction,
  changeTranslateAction,
  changeShowHeader,
} from "./src/redux/actions";
import AddInterestsScreen from "./src/screens/AddSubscriptions/components/AddInterestsScreen";
import { NavigationState } from "@react-navigation/core";

const TabNav = createBottomTabNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<StackParamList>();

const store = createStore(settingsReducer);

const getActiveRouteState = function (route: NavigationState): NavigationState {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index] as any;
  return getActiveRouteState(childActiveRoute);
};

function ArticlesStack(props: any) {
  return (
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
  );
}

function SubscriptionsStack(props: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddSubscriptionsScreen"
        component={AddSubscriptionsScreen}
        options={{ title: "Add a subscription", headerShown: false }}
      />
      <Stack.Screen
        name="AddInterestsScreen"
        component={AddInterestsScreen}
        options={{ title: "Add an interest", headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function Home(props: any) {
  const activeRoute = getActiveRouteState(props.navigation.getState());
  // @ts-ignore
  // console.log(activeRoute.state);

  try {
    if (
      // @ts-ignore
      activeRoute.state.index == 0 &&
      // @ts-ignore
      activeRoute.state.routes[0].state?.index == 1
    ) {
      // console.log("in interest");
      store.dispatch(changeShowHeader(false));
    } else {
      // console.log("not in interests");
      store.dispatch(changeShowHeader(true));
    }
  } catch {
    // console.log("exception caught");
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(getLanguagePairUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
        },
      })
      .then((l: any) => {
        store.dispatch(changeLearningAction(l.data[0]));
        store.dispatch(changeTranslateAction(l.data[1]));
        setLoading(false)
      });
  }, []);


  return (
    <Provider store={store}>
      { !loading ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props}></DrawerContent>}
        >
          <Drawer.Screen
            name="AddSubscriptions"
            component={SubscriptionsStack}
            options={{
              title: "Add a subscription",
              headerShown: store.getState().nav.showHeader,
            }}
          />
          <Drawer.Screen
            name="ClozemasterScreen"
            component={ClozemasterScreen}
          />
          <Drawer.Screen name="ArticlesStack" component={ArticlesStack} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      ) : (
        <></>
      )}
    </Provider>
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
