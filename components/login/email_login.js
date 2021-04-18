import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Dimensions } from "react-native";
import Constants from "expo-constants";
import { TextInput } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';
import { DataContext } from "../../context/dataContext";
import { useFocusEffect } from "@react-navigation/core";

/*
This is our login screen. The method to actually login is used right now
when pressing login, because otherwise we would have to login everytime we update the
application. However, the handle_login function works.
*/

export default function Login(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const { login } = useContext(DataContext)

  const handle_login = async () => {
    if (!email && !password) return setError("Please input email and password");
    else if (!email) return setError("Please input email");
    else if (!password) return setError("Please input password")
    setLoading(true);
    try {
      setError("")
      setLoading(true)
      await login(email, password);
      setLoading(false);
    } catch (e) {
      setError("Login failed " + e);
    }
    setLoading(false)
  };

  useFocusEffect(
    React.useCallback(() => {
      setError("")
    }, []))

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          TRIPPY
          </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your Email..."
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Enter a password..."
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          {error != "" && <Text
            style={styles.errorText}>
            {error}
          </Text>}
        </View>
        <TouchableOpacity disabled={loading} style={styles.confirmbutton} onPress={handle_login}>
          <Text style={styles.confirmbuttontext}>
            LOGIN
            </Text>
        </TouchableOpacity>
        <Text
          style={styles.registerTextStyle}
          onPress={() => props.navigation.navigate("email_sign_up")}>
          New Here ? Register
            </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    fontSize: 68,
    top: 100,
    justifyContent: "center",
    fontWeight: "100",
    borderWidth: 2,
    borderRadius: 90,
    color: "turquoise",
    borderColor: "turquoise",
    marginBottom: 120
  },
  inputcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17
  },
  inputs: {
    fontSize: 18,
    padding: 20,
    backgroundColor: "white",
    color: "turquoise",
    borderColor: "turquoise",
    margin: 15,
    borderWidth: 2,
    width: 300,
    borderRadius: 30,
    height: "auto",
  },
  confirmbutton: {
    color: "turquoise",
    backgroundColor: "turquoise",
    borderWidth: 0,
    borderRadius: 80,
    padding: 20,
    textAlign: "center",
    width: "90%"
  },
  confirmbuttontext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center"
  },
  registerTextStyle: {
    color: 'turquoise',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    paddingHorizontal: 20
  }
});