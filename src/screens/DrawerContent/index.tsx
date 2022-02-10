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
        console.log("HERE: ", l.data.result)
        setSubscriptions(l.data.result);
      });
  }, []);

  return (
    <ScrollView style={localStyles.container}>
      <Text style={localStyles.header}>
        The language you are learning is {props.settings.learning}
      </Text>
      <View style={{ flex: 5 }}>
        <GoToArticles subscriptions={subscriptions} {...props}></GoToArticles>
        <AddSubscription
          subscriptions={subscriptions}
          {...props}
        ></AddSubscription>
        <GoToSettings {...props}></GoToSettings>
      </View>
    </ScrollView>
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
    width: "70%",
    flex: 1,
    fontSize: 16,
    color: "#2e2e2d",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
