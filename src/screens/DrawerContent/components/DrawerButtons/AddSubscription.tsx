import { TabRouter } from "@react-navigation/native";
import axios from "axios";
import { getAuth } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../../../redux/bindings";
import {
  getLanguagePairUrl,
  getTranslateUrl,
  listSubscriptions,
} from "../../../AddSubscriptions/api";
import {
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,
  colors,
} from "react-native-elements";

const AddSubscription = (props: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("AddSubscriptions");
        }}
      >
        <Text>Subscriptions</Text>
      </TouchableOpacity>

      {/* // TASK implement this list item */}
      <ListItem.Accordion
        content={
          <>
            <Icon name="place" size={30} tvParallaxProperties={undefined} />
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {props.subscriptions.length > 1 ? (
          props.subscriptions.map((s: any, index: number) => (
            <ListItem
              key={index}
              onPress={() => console.log("press")}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{s.key}</ListItem.Title>
                <ListItem.Subtitle>{s.key}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron tvParallaxProperties={undefined} />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </ListItem.Accordion>

      <ScrollView>
        {props.subscriptions.length > 1 ? (
          props.subscriptions.map((s: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("ArticlesStack", {
                  screen: "Articles",
                  params: { subscription: s },
                });
              }}
            >
              <Text>{s.key}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubscription);

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
