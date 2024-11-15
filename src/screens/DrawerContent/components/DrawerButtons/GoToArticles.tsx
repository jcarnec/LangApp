import { TabRouter } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../../../redux/bindings";
import styles from "../../../styles";

const GoToArticles = (props: any) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        props.navigation.navigate("ArticlesStack", {
          screen: "Articles",
          params: { subscription: props.subscriptions },
        });
      }}
    >
      <ListItem.Content style={{ paddingLeft: 10 }}>
        <ListItem.Title>Articles</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GoToArticles);
