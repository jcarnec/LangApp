import React, { ReactNode, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,
  colors,
  Overlay,
} from "react-native-elements";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

export function Article(props: any) {
  // title:'Novak Djokovic lands in Dubai, then takes flight to native Serbia after deportation from Australia - ESPN'
  // source:'ESPN'
  // pubDate:'Mon, 17 Jan 2022 06:15:57 GMT'
  // link:'https://news.google.com/__i/rss/rd/articles/CBMie2h0dHBzOi8vd3d3LmVzcG4uY29tL3Rlbm5pcy9zdG9yeS9fL2lkLzMzMDgyMTgxL25vdmFrLWRqb2tvdmljLWxhbmRzLWR1YmFpLXRha2VzLWZsaWdodC1uYXRpdmUtc2VyYmlhLWRlcG9ydGF0aW9uLWF1c3RyYWxpYdIBiAFodHRwczovL3d3dy5lc3BuLmNvbS90ZW5uaXMvc3RvcnkvXy9pZC8zMzA4MjE4MS9ub3Zhay1kam9rb3ZpYy1sYW5kcy1kdWJhaS10YWtlcy1mbGlnaHQtbmF0aXZlLXNlcmJpYS1kZXBvcnRhdGlvbi1hdXN0cmFsaWE_cGxhdGZvcm09YW1w?oc=5'

  return (
    // <TouchableOpacity onPress={() => {props.navigation.navigate("ArticleView", {url: props.article.link})}} >
    //   <Text>{props.article.title}</Text>
    // </TouchableOpacity>

    <ListItem
      onPress={() => {
        props.navigation.navigate("ArticleView", { url: props.article.link });
      }}
      onLongPress={() => {props.toggleOverlay()}}
    >
      <ListItem.Content>
        <ListItem.Title>{props.article.title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron tvParallaxProperties={undefined} />
    </ListItem>
  );
}

function Articles(props: any) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <ScrollView>
        {props.articles.map((a: any, index: number) => (
          <Article
            article={a}
            navigation={props.navigation}
            key={index}
            toggleOverlay={toggleOverlay}
          ></Article>
        ))}
      </ScrollView>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
              tvParallaxProperties={undefined}
            />
          }
          title="Start Building"
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
}

export default Articles;

const styles = StyleSheet.create({
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
