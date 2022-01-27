
import React, {useState} from 'react'
import { Text, View, Image, TouchableHighlight, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { homeScreenProps } from '../../../global'
import styles from './styles'


export default function AddSubscriptionsKeyWordScreen ({ navigation }: homeScreenProps) {


  const [webSite, setWebsite] = useState("");
  const [keyWord, setKeyWord] = useState("");

    return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Key Word"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setKeyWord(text)}
        value={keyWord}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Web Site"
        onChangeText={(text) => setWebsite(text)}
        value={webSite}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonTitle}>Add</Text>
      </TouchableOpacity>
    </View>
    )
}