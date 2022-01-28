import React, { useRef, ReactNode, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
import { Modalize } from "react-native-modalize";

function ArticleView({ route, navigation }: homeScreenProps) {
  const [selectedWords, setSelectedWord] = useState("");
  const [pendingSelectedWords, setPendingSelectedWords] = useState("");
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    sendTranslation()
  }, [pendingSelectedWords]);
  

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
              sentence: pendingSelectedWords,
              learningLanguage: l.data[0],
              translateLanguage: l.data[1],
            },
          })
          .then((response) => {
            setSelectedWord(pendingSelectedWords);
            setTranslation(response.data);
          })
          .catch((e) => {
            alert(e);
            throw e;
          });
      });
  };

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
          }, 2000);
        } 
      }
      true; // note: this is required, or you'll sometimes get silent failures

      document.addEventListener('selectionchange', (e)=>{getSelectionText()})
        `;

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View style={styles.pageView}>
      <Modalize ref={modalizeRef}></Modalize>
      {/* <TranslationModal
        selectedWord={selectedWord}
        translation={translation}
      ></TranslationModal>

      <SendTranslationModal
        selectedWord={selectedWord}
        translation={translation}
        onPressFunction={sendTranslation}
      ></SendTranslationModal> */}

      <WebView
        style={styles.WebView}
        source={{ uri: route.params.url }}
        onMessage={(event) => {
          setPendingSelectedWords(event.nativeEvent.data);
        }}
        injectedJavaScript={runFirst}
      ></WebView>
      <TouchableOpacity onPress={onOpen}>
        <Text>{selectedWords}</Text>
        <Text>{translation}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ArticleView;
