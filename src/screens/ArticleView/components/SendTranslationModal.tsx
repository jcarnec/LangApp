import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
interface SendTranslationModalProps {}

const SendTranslationModal = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(props.selectedWord);
    if (props.selectedWord.length > 0) setModalVisible(true);
  }, [props.selectedWord]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(modalVisible);
      }}
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Send the request for the following word:
          </Text>
          <Text style={styles.modalText}>{props.selectedWord}</Text>
          {/* TASK (press modal) On press translation is set and the translation modal shows up
            
            
            */}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(!modalVisible);
              props.onPressFunction();
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SendTranslationModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modal: {
    flex: 1,
  },
});
