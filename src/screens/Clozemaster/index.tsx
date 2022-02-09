import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { homeScreenProps } from "../../../global";
import {
  actionCreators,
  getClozemasterUrl,
  getSentenceUrl,
  initialState,
  reducer,
} from "./api";
import shuffleArray from "./utils";

let clozemasterPage = 1;

export default function ClozemasterScreen({ navigation }: homeScreenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const { loading, error, sentences } = state;
  const [rightAnswer, setRightAnswer] = useState(false);
  const [missingWord, setMissingWord] = useState("");
  const [displayedSentence, setDisplayedSentence] = useState("");
  const [threeWords, setThreeWords] = useState([]);

  async function fetchSentences() {
    dispatch(actionCreators.loading());
    const clozemasterParams = {
      from: "eng",
      trans_to: "fra",
      length: 7,
      page: clozemasterPage,
    };
    axios
      .get(getClozemasterUrl(), { params: clozemasterParams })
      .then((response) => {
        dispatch(actionCreators.success(response.data.results));
        setSentences(response.data.results);
        clozemasterPage = clozemasterPage + 1;
      })
      .catch((e) => {
        alert(e)
        throw e
        dispatch(actionCreators.failure());
      });
  }

  useEffect(() => {
    fetchSentences().then();
  }, []);

  function getMissingWordAndThreeWords(sentence: {
    sentence?: any;
    tagged_sentence?: any;
    tokenised_sentence?: any;
  }) {
    let sentenceParams = {
      sentence: sentence.sentence,
      from: "eng",
      trans_to: "fra",
      length: 7,
      page: clozemasterPage,
    };
    return axios.get(getSentenceUrl(), {
      params: sentenceParams,
    });
  }

  function setSentences(passedSentences?: undefined) {
    if (!passedSentences && sentenceIndex >= sentences.length) {
      fetchSentences().then();
    } else {
      let sentencesPointer = sentences;
      let index = sentenceIndex;

      if (passedSentences) {
        sentencesPointer = passedSentences;
        index = 0;
      }

      let queryPromise = getMissingWordAndThreeWords(sentencesPointer[index]);

      queryPromise
        .then((response) => {
          let untokenisedSentence = sentencesPointer[index].sentence;
          untokenisedSentence = untokenisedSentence.replace(
            response.data.missingWord,
            "_____"
          );
          setDisplayedSentence(untokenisedSentence);
          setSentenceIndex(index + 1);
          setMissingWord(response.data.missingWord);
          setThreeWords(response.data.threeWords);
        })
        .catch((e) => {
          alert(e)
          throw e
        });
    }
  }

  if (loading) {
    return (
      <View style={styles.getStartedContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else if (error) {
    alert("There was an error loading the text.");
    return <></>;
  } else {
    return (
      <View style={styles.root}>
        <View style={styles.textContainer}>
          {rightAnswer ? (
            <Text style={styles.textContainer}>{"Wright answer"}</Text>
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textItems}>{displayedSentence}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {shuffleArray([...threeWords, missingWord]).map((item, index) => (
            <View style={styles.buttonItems} key={index}>
              <Button
                title={item}
                onPress={() => {
                  function checkAnswer(index: number) {
                    if (index == 3) {
                      setRightAnswer(true);
                    }
                    setTimeout(() => {
                      setRightAnswer(false);
                    }, 4000);
                  }
                  checkAnswer(index);
                  setSentences();
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
}


import { StyleSheet } from 'react-native';

let styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonItems: {
    width: "50%",
    padding: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textItems: {
    padding: 30,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  }, 
  root: {
      flex: 1
  }
});

