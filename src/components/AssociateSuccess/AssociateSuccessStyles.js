import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
  borderHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.7
  },
  borderHeaderContentStart: {
    justifyContent: 'flex-start',
  },
  styletext: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 10
  },
  viewBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.2
  },
  heightViewButton: {
    height: 60,
    marginBottom: 50
  },
  spaceBetween: {
    justifyContent: "space-between"
  }
}));
