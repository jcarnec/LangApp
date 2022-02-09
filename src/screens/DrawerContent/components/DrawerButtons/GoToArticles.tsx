import { TabRouter } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../../../redux/bindings";

const GoToArticles = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.navigation.navigate("ArticlesStack", {
          screen: "Articles",
          params: { subscription: props.subscriptions },

        });
      }}
    >
      <Text>All Articles</Text>
    </TouchableOpacity>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GoToArticles);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
