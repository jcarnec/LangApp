import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { homeScreenProps } from "../../../global";
import styles from "../styles";
import {
  getLanguagePairUrl,
  getLearningUrl,
  getUpdateInterestUrl,
  getUpdateKeyword,
  getUpdateWebsite,
  getWebsiteUrl,
} from "./api";
import { getAuth } from "firebase/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changeLearningAction,
  changeTranslateAction,
  changeShowHeader,
} from "../../redux/actions";
import { mapStateToProps, mapDispatchToProps } from "../../redux/bindings";
import { replaceDot, unReplaceDot } from "../../global/utils";
import { ArticlesModal } from "./components/ArticlesModal";
import { XMLParser } from "fast-xml-parser";

export async function getArticles(url: any) {
  return axios
    .get(url)
    .then((response) => {
      let parser = new XMLParser();
      let obj = parser.parse(response.data);
      if (obj.rss.channel.item) {
        return obj.rss.channel.item;
      } else {
        alert("No articles were found");
        return false;
      }
    })
    .catch((reason) => {
      alert(reason);
      throw reason;
      return false;
    });
}

function AddSubscriptionsScreen(props: any) {
  const [articles, setArticles] = useState(Object);
  const [webSite, setWebsite] = useState("");
  const [keyWord, setKeyWord] = useState("");


  function addByKeyword() {
    axios
      .post(getUpdateKeyword(), {
        params: {
          uid: getAuth().currentUser?.uid,
          language: props.settings.learning,
          keyword: keyWord,
        },
      })
      .then((result: any) => {
        getArticles(unReplaceDot(result.data.url)).then((articles) => {
          if (articles) {
            setArticles(articles);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function addByWebsite() {
    axios
      .post(getUpdateWebsite(), {
        params: {
          uid: getAuth().currentUser?.uid,
          language: props.settings.learning,
          website: replaceDot(webSite),
        },
      })
      .then((result: any) => {
        getArticles(unReplaceDot(result.data.url)).then((articles) => {
          if (articles) {
            setArticles(articles);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <ScrollView>
      <ArticlesModal articles={articles}></ArticlesModal>
      <View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            props.navigation.navigate("AddInterestsScreen")
          }}
        >
          <Text style={styles.buttonTitle}>Add an Interest</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Key Word"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setKeyWord(text)}
          value={keyWord}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addByKeyword();
          }}
        >
          <Text style={styles.buttonTitle}>Add by Keyword</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Web Site"
          onChangeText={(text) => setWebsite(text)}
          value={webSite}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addByWebsite();
          }}
        >
          <Text style={styles.buttonTitle}>Add by Website</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubscriptionsScreen);
