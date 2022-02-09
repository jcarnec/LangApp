import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { getArticles } from "..";
import { unReplaceDot } from "../../../global/utils";
import { getSubscribedTo, getUpdateInterestUrl } from "../api";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../redux/bindings";
import { changeShowHeader } from "../../../redux/actions";
import { ArticlesModal } from "./ArticlesModal";

const interests = [
  "WORLD",
  "NATION",
  "BUSINESS",
  "TECHNOLOGY",
  "ENTERTAINMENT",
  "SCIENCE",
  "SPORTS",
  "HEALTH",
];

{
  // TASK (toggle interest)
}

function AddInterestsScreen(props: any) {
  useEffect(() => {
    fetchSubscribed()
  }, []);

  function fetchSubscribed() {
    axios
      .post(getSubscribedTo(), {
        params: {
          uid: getAuth().currentUser?.uid,
          language: props.settings.learning,
        },
      })
      .then((l) => {
        setSubscribedTo(l.data.dict);
      });
  }

  interface IObjectKeys {
    [key: string]: string | number;
  }

  const [subscribedTo, setSubscribedTo] = useState({} as IObjectKeys );
  const [articles, setArticles] = useState(Object);

  return (
    <View>
      <ArticlesModal articles={articles}></ArticlesModal>
      {interests.map((i, index) => (
        <InterestButton
          {...props}
          title={i}
          key={index}
          subscribed={subscribedTo[i]}
        ></InterestButton>
      ))}
    </View>
  );

  function InterestButton(props: any) {
    return (
      <View>
        <CheckBox
          center
          title={props.title}
          checked={props.subscribed}
          onPress={() => {
            axios
              .post(getUpdateInterestUrl(), {
                params: {
                  uid: getAuth().currentUser?.uid,
                  category: props.title,
                  language: props.settings.learning,
                },
              })
              .then((result: any) => {
                if (result.data.subscribed) {
                  getArticles(unReplaceDot(result.data.url)).then(
                    (articles) => {
                      if (articles) {
                        setArticles(articles);
                      }
                    }
                  );
                } else {
                  alert("Successfully unsubscribed from " + props.title);
                }
              }).then(() => {
                fetchSubscribed()
              })
              .catch((e) => {
                alert(e);
                throw e;
              });
          }}
        />

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInterestsScreen);
