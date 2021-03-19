import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Constants from "expo-constants"

export default class Congrats extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.timeoutHandle = setTimeout(()=>{
            // Add your logic for the transition
            this.props.navigation.navigate("login")
       }, 3000);
      }

    render() {
        return (
            <View style={styles.container}>
                <Image
                source={{uri: "https://media.giphy.com/media/XtUPfbJIltIaY/giphy.gif"}}
                style={styles.img}
                />
                <Text style={styles.success}>
                    Success!
                </Text>
            </View>
        )
    }
}

//<iframe src="https://giphy.com/embed/XtUPfbJIltIaY" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/zach-galifianakis-cheers-the-hangover-part-iii-XtUPfbJIltIaY">via GIPHY</a></p>

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "turquoise",
      alignItems: "center",
    },
    img: {
        marginTop:Constants.statusBarHeight,
        height: 480,
        width: "80%",
        borderRadius: 8,
    },
    success: {
        fontWeight: "700",
        fontSize: 50,
        color: "white",
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });