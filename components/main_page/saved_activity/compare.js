import React, { useState, useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Orientation from 'react-native-orientation-locker';
import { DataContext } from "../../../context/dataContext";
import { Icon } from "react-native-elements";

const Compare = ({ navigation }) => {
    const { saved_activities } = useContext(DataContext)
    const [allEvents, setAllEvents] = useState(saved_activities)
    const [event1, setEvent1] = useState(null)
    const [event2, setEvent2] = useState(null)
    const scrollRef = useRef(null)

    const getRandomInt = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const setEvents = (set1, set2) => {
        const tmpEvents = [...allEvents]

        scrollRef.current?.scrollTo({
            y: 0,
            animated: true
        })

        if (set1) {
            if (tmpEvents.length < 1) {
                setEvent1(null)
                return
            }
            const index1 = getRandomInt(0, tmpEvents.length - 1)
            setEvent1(tmpEvents.pop(index1))
        }

        if (set2) {
            if (tmpEvents.length < 1) {
                setEvent2(null)
                return
            }
            const index2 = getRandomInt(0, tmpEvents.length - 1)
            setEvent2(tmpEvents.pop(index2))
        }
        setAllEvents(tmpEvents)
    }

    useEffect(() => {
        Orientation.lockToLandscape()
        setEvents(true, true)
        return () => Orientation.unlockAllOrientations()
    }, [])

    const event1Flex = event1 ? 1 : 0
    const event2Flex = event2 ? 1 : 0

    return (
        <View style={styles.container}>
            {(event1 && event2) && <View style={styles.checkButtons}>
                <View style={{ flex: event1Flex, alignItems: "center" }}>
                    {event1 &&
                        <TouchableOpacity onPress={() => setEvents(false, true)}>
                            <Icon name={"check"} type="MaterialIcons" color="black" size={40}></Icon>
                        </TouchableOpacity>}
                </View>
                <View style={{ flex: event2Flex, alignItems: "center" }}>
                    {event2 &&
                        <TouchableOpacity onPress={() => setEvents(true, false)}>
                            <Icon name={"check"} type="MaterialIcons" color="black" size={40}></Icon>
                        </TouchableOpacity>}
                </View>
            </View>}
            <ScrollView style={{ flex: 1 }} ref={scrollRef}>
                <View style={{ ...styles.eventData, marginTop: (event1 && event2) ? 0 : 10 }}>
                    <View style={{ flex: event1Flex, alignItems: "center" }}>
                        {event1 && <Text style={styles.eventName}>{event1.name}</Text>}
                    </View>
                    <View style={{ flex: event2Flex, alignItems: "center" }}>
                        {event2 && <Text style={styles.eventName}>{event2.name}</Text>}
                    </View>
                </View>
                <View style={styles.eventData}>
                    <View style={{ flex: event1Flex, alignItems: "center" }}>
                        {event1 && <Image style={styles.eventImage} source={{uri: event1.image}} />}
                    </View>
                    <View style={{ flex: event2Flex, alignItems: "center" }}>
                        {event2 && <Image style={styles.eventImage} source={{uri: event2.image}} />}
                    </View>
                </View>
                <View style={{ ...styles.eventData }}>
                    <View style={{ flex: event1Flex, alignItems: "center", paddingHorizontal: 15 }}>
                        {event1 && <Text style={styles.eventDesc}>{event1.description}</Text>}
                    </View>
                    <View style={{ flex: event2Flex, alignItems: "center", paddingHorizontal: 15 }}>
                        {event2 && <Text style={styles.eventDesc}>{event2.description}</Text>}
                    </View>
                </View>
                <View style={{ ...styles.eventData }}>
                    <View style={{ flex: event1Flex, alignItems: "center" }}>
                        {event1 && <Text style={styles.eventDuration}>{event1.duration}</Text>}
                    </View>
                    <View style={{ flex: event2Flex, alignItems: "center" }}>
                        {event2 && <Text style={styles.eventDuration}>{event2.duration}</Text>}
                    </View>
                </View>
                <View style={{ ...styles.eventData }}>
                    <View style={{ flex: event1Flex, alignItems: "center" }}>
                        {event1 && <Text style={styles.eventPrice}>{event1.price}</Text>}
                    </View>
                    <View style={{ flex: event2Flex, alignItems: "center" }}>
                        {event2 && <Text style={styles.eventPrice}>{event2.price}</Text>}
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}></View>
                {(!event1 || !event2) && <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate("main")}>
                    <Text style={styles.bookButtonText}>
                        BOOK
                    </Text>
                </TouchableOpacity>}
            </ScrollView>
        </View>
    )
}

export default Compare

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    checkButtons: {
        flexDirection: "row",
        marginVertical: 10
    },
    eventData: {
        flexDirection: "row",
        marginTop: 10
    },
    eventName: {
        fontSize: 30
    },
    eventImage: {
        width: "95%",
        height: undefined,
        aspectRatio: 4 / 3
    },
    eventDesc: {
        fontSize: 18
    },
    eventDuration: {
        fontSize: 30
    },
    eventPrice: {
        fontSize: 30
    },
    bookButton: {
        color: "turquoise",
        backgroundColor: "turquoise",
        borderWidth: 0,
        borderRadius: 10,
        padding: 20,
        marginTop: 0,
    },
    bookButtonText: {
        fontSize: 17,
        fontWeight: "800",
        color: "white",
        alignItems: "center",
        textAlign: "center",
    }
})