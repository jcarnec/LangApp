import * as React from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import UserHeader from "./components/UserHeader/UserHeader";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getLanguagePairUrl, listSubscriptions } from "../AddSubscriptions/api";
import { getAuth } from "firebase/auth";
import {
  changeLearningAction,
  changeTranslateAction,
} from "../../redux/actions";
import { mapStateToProps, mapDispatchToProps } from "../../redux/bindings";
import GoToArticles from "./components/DrawerButtons/GoToArticles";
import GoToSettings from "./components/DrawerButtons/GoToSettings";
import AddSubscription from "./components/DrawerButtons/AddSubscription";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import GoToClozemaster from "./components/DrawerButtons/GoToClozemaster";
import { countryCodeString } from "../../global/utils";

const DrawerContent = (props: any) => {
  const [subscriptions, setSubscriptions] = useState(Object);

  useEffect(() => {
    axios
      .post(listSubscriptions(), {
        params: {
          uid: getAuth().currentUser?.uid,
          language: props.settings.learning,
        },
      })
      .then((l) => {
        console.log("HERE: ", l.data.result);
        setSubscriptions(l.data.result);
      });
  }, []);

  return (
    <View>
      <ListItem bottomDivider>
        <ListItem.Content style={{marginTop: 20}}>
          <ListItem.Title h4>
            The language you are learning is {countryCodeString(props.settings.learning)}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <GoToArticles subscriptions={subscriptions} {...props}></GoToArticles>
      <AddSubscription
        subscriptions={subscriptions}
        {...props}
      ></AddSubscription>

      <GoToClozemaster {...props}></GoToClozemaster>
      <GoToSettings {...props}></GoToSettings>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 10,
    width: "100%",
  },

  header: {
    alignContent: "center",
    marginTop: 100,
    width: "100%",
    flex: 1,
    fontSize: 16,
    color: "#2e2e2d",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
