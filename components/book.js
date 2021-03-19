import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { WebView } from "react-native-webview";
//import Amplify, { API, graphqlOperation, Analytics } from "aws-amplify";
//import * as mutations from "./src/graphql/mutations";
//import { withAuthenticator } from "aws-amplify-react-native";
//import config from "./aws-exports";

//Amplify.configure(config);
//Analytics.disable();

export default class Book extends React.Component {
  state = {
    amount: 15,
    quantity: "0",
    screen: "product",
    //initUrl: "AMPLIFY-URL/",
    //url: "AMPLIFY-URL/payment-init",
    loading: true
  };

  render(){
      return(
        <View><Text>In Progress</Text></View>
          
      )
  }

}

  /*

  async createPaymentSession() {
    // hardcode input values, make these dynamic with the values from the logged in user
    const input = {
      amount: this.state.amount * this.state.quantity,
      name: "leonard",
      email: "leonard.platzer@gmail.com"
    };

    await API.graphql(
      graphqlOperation(mutations.createPayment, { input: input })
    )
      .then(result => {
        const sessionID = JSON.parse(result.data.createPayment.body);
        this.setState({
          url: this.state.initUrl + "payment?session=" + sessionID.id,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  handleOrder() {
    this.setState({ screen: "payment" });
  }

  _onNavigationStateChange(webViewState) {
    if (webViewState.url === this.state.initUrl + "payment-init") {
      this.createPaymentSession();
    }

    if (webViewState.url === this.state.initUrl + "payment-success/") {
      this.setState({ screen: "success" });
    }

    if (webViewState.url === this.state.initUrl + "payment-failure/") {
      this.setState({ screen: "failure" });
    }
  }

  startPayment() {
    const loader = this.state.loading;
    let url = this.state.url;
    if (url === "") {
      url = this.state.initUrl;
    }

    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={{ flex: 2 }}>
          {loader && (
            <View style={[styles.loader, styles.horizontal]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#de62bf"
              />
            </View>
          )}
          <View
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              height: 70,
              width: Dimensions.get("window").width,
              zIndex: 200
            }}
          />
          <WebView
            mixedContentMode="never"
            source={{
              uri: url
            }}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          />
        </View>
      </View>
    );
  }

  showProduct = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.product}>Product A</Text>
        <Text style={styles.text}>
          This is a great product which we sell to you
        </Text>
        <Text style={styles.text}>
          The price for today is € {this.state.amount},- per item
        </Text>
        <Text style={styles.quantity}>How many items do you want to buy?</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ quantity: text })}
            value={this.state.quantity}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleOrder()}
          >
            <Text>Order now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    switch (this.state.screen) {
      case "product":
        return this.showProduct();
      case "payment":
        return this.startPayment();
      case "success":
        return (
          <View style={styles.container}>
            <Text style={{ fontSize: 25 }}>Payments Succeeded :)</Text>
          </View>
        );
      case "failure":
        return (
          <View style={styles.container}>
            <Text style={{ fontSize: 25 }}>Payments failed :(</Text>
          </View>
        );
      default:
        break;
    }
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  textInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 15
  },
  quantity: {
    marginTop: 50,
    fontSize: 17,
    marginBottom: 10
  },
  text: {
    fontSize: 17,
    marginBottom: 10
  },
  product: {
    fontSize: 22,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 50,
    margin: 10
  },
  loader: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});*/