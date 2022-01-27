import { firebase } from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: any = {
  apiKey: "AIzaSyC92ZLFBrls0rJCtopUAi-PBMMDnWXojd4",
  authDomain: "fir-tutorial-d9fd0.firebaseapp.com",
  databaseURL: "https://fir-tutorial-d9fd0-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: 'fir-tutorial-d9fd0',
  storageBucket: "gs://fir-tutorial-d9fd0.appspot.com"
};

let app = initializeApp(firebaseConfig)

export {app}
