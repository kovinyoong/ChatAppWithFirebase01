import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const login = () => {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ userCredential }) => {
        console.log("signed in!");
        // navigation.navigate("Chat", { email })
      })
      .catch((error) => {
        console.log("ERROR");
        setErrorText(error.message);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(input) => setEmail(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },

  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },

  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
  },
  fieldTitle: {
    borderColor: "black",
    width: "80%",
    marginTop: 20,
  },

  loginButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 150,
  },
  buttonText: {
    textAlign: "center",
    color: "#20232a",
  },
  buttonContainer: {
    flexDirection: "row",
  },

  errorText: {
    color: "red",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 20,
  },
});
