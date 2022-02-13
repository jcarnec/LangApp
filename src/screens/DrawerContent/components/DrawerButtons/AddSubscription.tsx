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
  Overlay,
} from "react-native-elements";
import { unReplaceDot } from "../../../../global/utils";

const AddSubscription = (props: any) => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View>
      <ListItem.Accordion 
      bottomDivider
      style={{marginLeft: 10}}
        content={
          <>
            <Button
              onPress={() => {
                props.navigation.navigate("AddSubscriptions");
              }}
              icon={
                <Icon
                  name="plus"
                  type="font-awesome"
                  color="white"
                  size={10}
                  tvParallaxProperties={undefined}
                />
              }
            />
            <ListItem.Content style={{ paddingLeft: 10 }}>
              <ListItem.Title>Subscriptions</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {
          // TASK on long press unsbubscribe
        }
        {props.subscriptions.length > 1 ? (
          props.subscriptions.map((s: any, index: number) => (
            <ListItem
              key={index}
              onPress={() => {
                props.navigation.navigate("ArticlesStack", {
                  screen: "Articles",
                  params: { subscription: s },
                });
              }}
              onLongPress={toggleOverlay}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{unReplaceDot(s.key)}</ListItem.Title>
                <ListItem.Subtitle>{s.type}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron tvParallaxProperties={undefined} />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </ListItem.Accordion>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
              tvParallaxProperties={undefined}
            />
          }
          title="Start Building"
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubscription);

const styles = StyleSheet.create({
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
