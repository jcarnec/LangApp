import { DrawerContentScrollView } from '@react-navigation/drawer';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';



const UserHeader = (props: any) => {
  return (
    <View>
      {props.children}
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {}
});


