import { View, Text, SectionList } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { styles } from "./styles";
import SettingsList from "./components/SettingsList";
import axios from "axios";
import { getLanguagePairUrl} from "../AddSubscriptionsInterest/api";
import { getAuth } from "firebase/auth";
import { mapDispatchToProps, mapStateToProps } from "../../redux/bindings";
import { connect } from "react-redux";

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

  function updateSettings() {
    axios
      .post(getLanguagePairUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
        },
      })
      .then((l) => {
        props.changeLearning(l.data[0]);
        props.changeTranslate(l.data[1])
      });

  }
  useEffect(() => {

    // TASK (redux settings) temporary to load it in
    updateSettings()

    // TASK (redux settings) Done

    
    if (settingsData[0].extra.learning) {
      settingsData[0].extra.learning.language[1](
        props.settings.learning
      );
    }


    if (settingsData[0].extra.translate) {
      settingsData[0].extra.translate.language[1](
        props.settings.translate
      );
    }
  }, []);

  useEffect(() => {
    props.changeLearning(settingsData[0].extra.learning?.language[0])
    props.changeTranslate(settingsData[0].extra.translate?.language[0])
  }, [settingsData[0].extra.learning?.language[0], settingsData[0].extra.translate?.language[0]]);
  

  return (
    <View style={{ flex: 1 }}>
      <SettingsList settingsData={settingsData}></SettingsList>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
