import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CodeInput from 'react-native-confirmation-code-input';


export default class Email_Verification extends React.Component {
    constructor(props) {
        super(props)
    }

    _onFinishCheckingCode1 = (code) => {
        if (code){
            return true
        }
    }
    
    render () {

  return (
<View style = {styles.container}>
      <View style={styles.root}>
        <Text style={styles.title}>VERIFY YOURSELF</Text>
        <CodeInput
      ref="codeInputRef2"
      secureTextEntry
      compareWithCode='AsDW2'
      activeColor="turquoise"
      inactiveColor="turquoise"
      autoFocus={false}
      ignoreCase={true}
      inputPosition='center'
      size={50}
      onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
      containerStyle={{ marginTop: 30 }}
      codeInputStyle={{ borderWidth: 1.5 }}
    />
        
      </View>
      <View>
      <TouchableOpacity style={styles.verifytouchable} onPress={() => this.props.navigation.navigate("basic_setup")}>
          <Text style={styles.verifytext}>
              VERIFY
          </Text>
      </TouchableOpacity>
      </View>
      </View>
  );
};
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },

    root: { 
        flex: 1, 
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "column",
    },

    title: { 
        textAlign: "center", 
        fontSize: 40,
        color:"turquoise",
        marginBottom: 30,
        fontWeight: "500",
        marginTop: 60,
    },

    codeFieldRoot: { 
        marginTop: 20,
        top: 100,
    },

    cell: {
        width: 60,
        height: 60,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1.5,
        borderColor: "#00000030",
        textAlign: "center",
        justifyContent: "center"
    },

    focusCell: {
        borderColor: "#000",
        padding: 20
    },

    verifytouchable: {
        backgroundColor: "turquoise",
        padding: 40,
        paddingLeft: 80,
        paddingRight: 80,
        marginBottom: 90,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "turquoise"
    },

    verifytext: {
        fontSize: 30,
        fontWeight: "400",
        color: "white"
    }
})
