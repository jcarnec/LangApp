import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableHighlight, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { homeScreenProps } from "../../../global";
import {
  getInterestsRSSUrl,
  getKeywordUrl,
  getLearningUrl,
  getWebsiteUrl,
} from "../AddSubscriptions/api";
import { XMLParser } from "fast-xml-parser";
import Articles from "./components/Articles";
import { SplashScreen } from "../SplashScreen";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../redux/bindings";
import { unReplaceDot } from "../../global/utils";

function ArticlesScreen(props: any) {
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesLoaded, setArticlesLoaded] = useState(false);

  function getArticles() {
    let subscriptions
    if(props.route.params.subscription.length) {
      subscriptions = [...props.route.params.subscription];
    } else {
      subscriptions = [props.route.params.subscription]
    }


    subscriptions.forEach((element) => {

      let url = unReplaceDot(element.link);
      axios
        .get(url)
        .then((response) => {
          let parser = new XMLParser();
          let obj = parser.parse(response.data);
          if (obj.rss.channel.item) {
            setArticles(old => [...old, ...obj.rss.channel.item]);
          } else {
            throw "rss.channel is not truthy";
          }
        })
        .catch((reason) => {
          
        });
    });
    setArticlesLoaded(true);
  }

  useEffect(() => {
    setArticlesLoaded(false);
    setArticles([])
    getArticles();
    console.log(
      articles
    )
  }, [props.route.params.subscription]);

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
