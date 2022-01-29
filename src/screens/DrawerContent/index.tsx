import * as React from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import UserHeader from "./components/UserHeader/UserHeader";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useEffect } from "react";
import axios from "axios";
import {
  getLanguagePairUrl,
} from "../AddSubscriptionsInterest/api";
import { getAuth } from "firebase/auth";
import {
  changeLearningAction,
  changeTranslateAction,
} from "../../redux/actions";
import { mapStateToProps, mapDispatchToProps } from "../../redux/bindings";

const DrawerContent = (props: any) => {
  useEffect(() => {
    // TASK (redux settings) Done
    axios
      .post(getLanguagePairUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
        },
      })
      .then((l) => {
        console.log(l.data);
        props.changeLearning(l.data[0]);
        props.changeTranslate(l.data[1])
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>The language you are learning is {props.settings.learning}</Text>
    </View>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
