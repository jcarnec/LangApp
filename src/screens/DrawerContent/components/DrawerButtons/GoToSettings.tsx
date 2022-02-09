
import { TabRouter } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../../redux/bindings';
import styles from '../../../styles'


const GoToSettings = (props:any) => {
    return (
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          props.navigation.navigate("Settings");
        }}
      >
      <Text style={styles.buttonTitle}>Settings</Text>
      </TouchableOpacity>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GoToSettings);



