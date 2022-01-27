import { ReactNode } from "react";
import { Text, View, Image, TouchableHighlight, TextInput, Pressable } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";

function Article(props: any) {
  // title:'Novak Djokovic lands in Dubai, then takes flight to native Serbia after deportation from Australia - ESPN'
  // source:'ESPN'
  // pubDate:'Mon, 17 Jan 2022 06:15:57 GMT'
  // link:'https://news.google.com/__i/rss/rd/articles/CBMie2h0dHBzOi8vd3d3LmVzcG4uY29tL3Rlbm5pcy9zdG9yeS9fL2lkLzMzMDgyMTgxL25vdmFrLWRqb2tvdmljLWxhbmRzLWR1YmFpLXRha2VzLWZsaWdodC1uYXRpdmUtc2VyYmlhLWRlcG9ydGF0aW9uLWF1c3RyYWxpYdIBiAFodHRwczovL3d3dy5lc3BuLmNvbS90ZW5uaXMvc3RvcnkvXy9pZC8zMzA4MjE4MS9ub3Zhay1kam9rb3ZpYy1sYW5kcy1kdWJhaS10YWtlcy1mbGlnaHQtbmF0aXZlLXNlcmJpYS1kZXBvcnRhdGlvbi1hdXN0cmFsaWE_cGxhdGZvcm09YW1w?oc=5'

  return (
    <TouchableOpacity onPress={() => {props.navigation.navigate("ArticleView", {url: props.article.link})}} >
      <Text>{props.article.title}</Text>
    </TouchableOpacity>
  );
}

function Articles(props: any) {
  return (
    <ScrollView>
      {props.articles.map((a: any, index: number) => (
        <Article article={a} navigation={props.navigation} key={index} ></Article>
      ))}
    </ScrollView>
  );
}

export default Articles;
