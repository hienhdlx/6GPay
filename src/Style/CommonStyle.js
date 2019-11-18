import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginTop: Platform.OS === 'ios' ? 35 : 0
    },
    label: {
        color: "#A5A5A5",
        fontSize:width*0.04
    },
    text: {
        color: "white",
        fontSize: width*0.04,
        height: height*0.04,
        padding: 0
    },
    borderBot: {
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },
    lineHei: {
        lineHeight: 22
    },
    flexRow: {
        flexDirection:'row'
    },
    viewButton:{
        width: width,
        height: height / 10,
        flexDirection: 'row',
        paddingHorizontal: width / 10,
        paddingVertical: height / 40,
    },
    bodyButton:{
        height: height / 15,
        width: width * 0.8,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#d2a61f',
        marginRight: width / 7,
    },
    textButton:{
        fontSize: 16,
        fontWeight: '700',
    },
}));
