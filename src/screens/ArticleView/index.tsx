import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, View, Text, Modal, Pressable } from "react-native";
import { useAmbientTRenderEngine } from "react-native-render-html";
import { homeScreenProps } from "../../../global";
import axios from "axios";
import { getTranslationUrl } from "./api";
import { SplashScreen } from "../SplashScreen";
import { WebView } from "react-native-webview";
import { styles } from "./styles";
import TranslationModal from "./components/TranslationModal";
import { getLanguagePairUrl } from "../AddSubscriptionsInterest/api";
import { getAuth } from "firebase/auth";
import SendTranslationModal from "./components/SendTranslationModal";
import SwipeView from "./components/SwipeView";
function ArticleView({ route, navigation }: homeScreenProps) {
  const [selectedWord, setSelectedWord] = useState("");
  const [translation, setTranslation] = useState("");

  const sendTranslation = () => {
          axios
            .post(getLanguagePairUrl(), {
              params: {
                uid: getAuth().currentUser?.uid,
              },
            })
            .then((l) => {
              axios
                .post(getTranslationUrl(), {
                  params: {
                    sentence: selectedWord,
                    learningLanguage: l.data[0], 
                    translateLanguage: l.data[1],
                  },
                })
                .then((response) => {
                  setSelectedWord(selectedWord);
                  setTranslation(response.data);
                })
                .catch((e) => {
                  alert(e);
                  throw e;
                });
            });

  }

  const runFirst = `

      let timeout = null;
      function getSelectionText() {
        var text = "";
        var lengthOfString = window.getSelection().toString().length 
        if (lengthOfString > 0) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            text = window.getSelection().toString();
            window.ReactNativeWebView.postMessage(text)
          }, 100);
        } 
      }
      true; // note: this is required, or you'll sometimes get silent failures

      document.addEventListener('selectionchange', (e)=>{getSelectionText()})
        `;

  return (
    <View style={styles.pageView}>
      <TranslationModal
        selectedWord={selectedWord}
        translation={translation}
      ></TranslationModal>

      <SendTranslationModal
        selectedWord={selectedWord}
        translation={translation}
        onPressFunction={sendTranslation}
        >
      </SendTranslationModal>
    
      
      {/* COMPLETE (target language) pass paramter of language */}
      <WebView
        style={styles.WebView}
        source={{ uri: route.params.url }}
        onMessage={(event) => {
          setSelectedWord(event.nativeEvent.data);
        }}
        injectedJavaScript={runFirst}
      ></WebView>

      <SwipeView></SwipeView>
    </View>
  );
}

export default ArticleView;
