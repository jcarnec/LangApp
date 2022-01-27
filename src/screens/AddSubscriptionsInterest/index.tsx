import axios from "axios";
import React, { useState } from "react";
import { Text, View, Image, TouchableHighlight, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { homeScreenProps } from "../../../global";
import styles from "./styles";
import { getUpdateInterestUrl } from "./api";
import { getAuth } from "firebase/auth";

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

export default function AddSubscriptionsInterestScreen({
  navigation,
}: homeScreenProps) {
  function InterestButton(props: any) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(getUpdateInterestUrl());
            axios
              .post(getUpdateInterestUrl(), {
                params: { 
                  uid: getAuth().currentUser?.uid,
                  category: props.title
                },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                alert(e)
                throw e
              });
          }}
        >
          <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {interests.map((i, index) => (
        <InterestButton title={i} key={index}>
          {" "}
        </InterestButton>
      ))}
    </View>
  );
}
