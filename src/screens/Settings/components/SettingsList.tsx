import * as React from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";
import axios from "axios";
import {
  postLearningUrl,
  postTranslateUrl,
} from "../../AddSubscriptionsInterest/api";
import { getAuth } from "firebase/auth";

function renderLearning(props: any) {
  let extraDict = props.section.extra.learning;

  return (
    <View style={styles.item}>
      <Text>{extraDict.title}</Text>
      <Text>{extraDict.description}</Text>
      <Picker
        selectedValue={props.section.extra.learning.language[0]}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => {
          // TASK Figure out how to fix this
          axios
            .post(postLearningUrl(), {
              params: {
                uid: getAuth().currentUser?.uid,
                language: { itemValue },
              },
            })
            .then((l) => {
              props.section.extra.learning.language[1](itemValue);
            })
            .catch((e) => {
              alert(e);
              throw e;
            });
        }}
      >
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
}

function renderTranslated(props: any) {
  let extraDict = props.section.extra.learning;

  return (
    <View style={styles.item}>
      <Text>{extraDict.title}</Text>
      <Text>{extraDict.description}</Text>
      <Picker
        selectedValue={props.section.extra.translate.language[0]}
        style={{ height: 50, width: 150 }}
        // TASK Figure out how to fix this
        onValueChange={(itemValue) => {
          return axios
            .post(postTranslateUrl(), {
              params: {
                uid: getAuth().currentUser?.uid,
                language: itemValue,
              },
            })
            .then((l) => {
              props.section.extra.translate.language[1](itemValue);
            })
            .catch((e) => {
              alert(e);
              throw e;
            });
        }}
      >
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
}

function RenderItem(props: any) {
  switch (props.item) {
    case "Learning":
      return renderLearning(props);
    case "Translated":
      return renderTranslated(props);
  }
  return <Text>{props.item}</Text>;
}

const SectionHeader = (props: any) => {
  return (
    <View>
      <Text style={styles.header}>{props.section.title}</Text>
    </View>
  );
};

const ItemSeparator = (props: any) => {
  return <View style={styles.lineStyle} />;
};

const SettingsList = (props: any) => {
  return (
    <SectionList
      sections={props.settingsData}
      style={{ flex: 1, width: "100%", marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(it) => it}
      renderItem={RenderItem}
      renderSectionHeader={SectionHeader}
    />
  );
};

export default SettingsList;

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
  header: {
    margin: 10,
  },
  item: {
    margin: 10,
  },
});
