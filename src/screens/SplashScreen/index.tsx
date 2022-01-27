import { View, Image } from "react-native";
import { StyleSheet } from "react-native";

const SplashScreen = () => {
  const is = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 300,
      height: 400,
    },
  });

  return (
    <View style={is.container}>
      <Image style={is.logo} source={require("../../../assets/icon.png")} />
    </View>
  );
};

export {SplashScreen}