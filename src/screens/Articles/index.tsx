import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableHighlight, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { homeScreenProps } from "../../../global";
import {
  getInterestsRSSUrl,
  getLearningUrl,
} from "../AddSubscriptionsInterest/api";
import styles from "./styles";
import { XMLParser } from "fast-xml-parser";
import Articles from "./components/Articles";
import { SplashScreen } from "../SplashScreen";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../redux/bindings";

function ArticlesScreen(props: any) {
  const [articles, setArticles] = useState(Object);
  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const isFocused = useIsFocused();

  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.

  useEffect(() => {
    getArticles();
  }, [isFocused]);

  function getArticles() {
    // TASK (redux settings) Done
    axios
      .post(getInterestsRSSUrl(), {
        params: {
          uid: getAuth().currentUser?.uid,
          language: props.settings.learning,
        },
      })
      .then((result: any) => {
        let url = result.data.url;
        return axios.get(url);
      })
      .then((response) => {
        let parser = new XMLParser();
        let obj = parser.parse(response.data);
        if (obj.rss.channel.item) {
          setArticles(obj.rss.channel.item);
          setArticlesLoaded(true);
        } else {
          alert("The articles were not loaded properly");
          throw "rss.channel is not truthy";
        }
      })
      .catch((reason) => {
        alert(reason);
        throw reason;
      });
  }

  useEffect(() => {
    getArticles();
  }, []);

  if (!articlesLoaded) {
    return <SplashScreen></SplashScreen>;
  } else {
    return (
      <View>
        <Articles articles={articles} navigation={props.navigation}></Articles>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesScreen);