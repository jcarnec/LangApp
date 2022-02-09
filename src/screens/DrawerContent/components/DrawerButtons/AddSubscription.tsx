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

const AddSubscription = (props: any) => {

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("AddSubscriptions");
        }}
      >
        <Text>Subscriptions</Text>
      </TouchableOpacity>
      <ScrollView>
        {props.subscriptions.length > 1 ? (
          props.subscriptions.map((s: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("ArticlesStack", {
                  screen: "Articles",
                  params: {subscription: s},
                });
              }}
            >
              <Text>{s.key}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubscription);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
