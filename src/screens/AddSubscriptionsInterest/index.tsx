import axios from "axios";
import React, { useState } from "react";
import { Text, View, Image, TouchableHighlight, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { homeScreenProps } from "../../../global";
import styles from "./styles";
import {
  getLanguagePairUrl,
  getLearningUrl,
  getUpdateInterestUrl,
} from "./api";
import { getAuth } from "firebase/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeLearningAction,
  changeTranslateAction,
} from "../../redux/actions";
import { mapStateToProps, mapDispatchToProps } from "../../redux/bindings";
const interests = [
  "WORLD",
  "NATION",
  "BUSINESS",
  "TECHNOLOGY",
  "ENTERTAINMENT",
  "SCIENCE",
  "SPORTS",
  "HEALTH",
];

const onPressFunc = (props: any) => {
  // TASK (redux settings) Done
  axios
    .post(getUpdateInterestUrl(), {
      params: {
        uid: getAuth().currentUser?.uid,
        category: props.title,
        language: props.settings.translate,
      },
    })
    .catch((e) => {
      alert(e);
      throw e;
    });
};

function InterestButton(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPressFunc(props);
        }}
      >
        <Text style={styles.buttonTitle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddSubscriptionsInterestScreen(props: any) {
  return (
    <View style={styles.container}>
      {interests.map((i, index) => (
        <InterestButton {...props} title={i} key={index}>
          {" "}
        </InterestButton>
      ))}
    </View>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubscriptionsInterestScreen);
