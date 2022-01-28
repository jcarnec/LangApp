import { View, Text, SectionList } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { styles } from "./styles";
import SettingsList from "./components/SettingsList";
import axios from "axios";
import { getLanguagePairUrl, getLearningUrl } from "../AddSubscriptionsInterest/api";
import { getAuth } from "firebase/auth";

const SettingsScreen = (props: any) => {


  let settingsData = [
    {
      title: "Language",
      data: ["Learning", "Translated"],
      extra: {
        learning: {
          title: "Current Language",
          description: "Select the current language you want to practice.",
          language: useState(""),
        },
        translate: {
          title: "Language translate into",
          description: "Select the language to translate text into.",
          language: useState(""),
        },
      },
    },

    {
      title: "Account",
      data: ["logout"],
      extra: { title: "logout", description: "Logout of account" },
    },
  ];

  useEffect(() => {
    axios
      .post(getLanguagePairUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
        },
      })
      .then((l: any) => {
        if (settingsData[0].extra.learning) {
          console.log("TCL: SettingsScreen -> l.data[0]", l.data[0])
          settingsData[0].extra.learning.language[1](
            l.data[0]
          );
        }


        if (settingsData[0].extra.translate) {
          console.log("TCL: SettingsScreen -> l.data[1]", l.data[1])
          settingsData[0].extra.translate.language[1](
            l.data[1]
          );
        }
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SettingsList settingsData={settingsData}></SettingsList>
    </View>
  );
};

export default SettingsScreen;
