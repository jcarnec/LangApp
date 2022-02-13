
import { TabRouter } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../../redux/bindings';
import styles from '../../../styles'


const GoToSettings = (props:any) => {
    return (
    <ListItem
      bottomDivider
      onPress={() => {
        props.navigation.navigate("Settings");
      }}
    >
      <ListItem.Content style={{ paddingLeft: 10 }}>
        <ListItem.Title>Settings</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GoToSettings);



