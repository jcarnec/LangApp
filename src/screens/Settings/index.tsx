import { View, Text, SectionList, TouchableOpacity } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { getLanguagePairUrl } from "../AddSubscriptions/api";
import { getAuth, signOut } from "firebase/auth";
import { mapDispatchToProps, mapStateToProps } from "../../redux/bindings";
import { connect } from "react-redux";
import { ListItem, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import style from "../styles"
const languagesArray = [
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "English", value: "en" },
];
const SettingsScreen = (props: any) => {

  function updateSettings() {
    axios
      .post(getLanguagePairUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
        },
      })
      .then((l) => {
        console.log(props)
        props.changeLearning(l.data[0]);
        props.changeTranslate(l.data[1]);
      });
  }
  useEffect(() => {
    updateSettings();
  }, []);


  return (

    <View style={{ flex: 1 }}>
    <ListItem bottomDivider>
      <ListItem.Content style={{ marginTop: 20 }}>
        <ListItem.Title h4>Languages</ListItem.Title>
      </ListItem.Content>
    </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ marginTop: 20 }}>
          <ListItem.Title h5>Language you want to learn</ListItem.Title>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={languagesArray}
            value={props.settings.learning}
          />
        </ListItem.Content>
      </ListItem>


      <ListItem bottomDivider>
        <ListItem.Content style={{ marginTop: 20 }}>
          <ListItem.Title h5>Language you want to translate into</ListItem.Title>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={languagesArray}
            value={props.settings.translate}
          />
          
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ marginTop: 20 }}>
          <View style={style.container}>
        <TouchableOpacity
          style={style.navButton}
          onPress={() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                // Sign-out successful.
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          <Text style={style.buttonTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
