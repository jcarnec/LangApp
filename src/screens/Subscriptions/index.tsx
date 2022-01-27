import React, { useEffect } from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { homeScreenProps } from '../../../global'
import styles from './styles'


export default function SubscriptionsScreen({ navigation }: homeScreenProps) {

  // REDIRECT remove this 
  useEffect(() => {
    navigation.navigate("ArticlesStack");
  }, []);


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate("AddSubscriptionsTabs");}}>
                <Image style={styles.plusButton} source={require('../../../assets/plusIcon.jpeg')} />
            </TouchableOpacity>
        </View>
    )
}