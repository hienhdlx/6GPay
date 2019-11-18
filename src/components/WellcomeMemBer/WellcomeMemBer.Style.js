import {Platform, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  image1: {
    paddingHorizontal: 20
  },
  wrapImageHeader: {
    marginTop: 50,
  },
  styleImage: {
    width: 297,
    height: 215,
  },
  styleImage1: {
    position: 'absolute',
    paddingHorizontal: 110,
    paddingTop: 38,
  },
  wrapText: {
    width: "100%",
    marginTop: 10
  },
  text: {
    color: '#d2a61fff',
    fontSize: 25,
    textAlign: "center"
  },
  wrapText1: {
    width: "100%",
  },
  text1: {
    fontSize: 14,
    color: '#dededeff',
    textAlign: "center",
    paddingTop: 3
  },
  text2: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: 'bold',
  },
  wrapTotalText: {
    marginTop: 25,
    paddingHorizontal: width / 10,
  },
  wrapTotalText1: {
    marginTop: 12,
    paddingHorizontal: 26,
    height: 74
  },
  viewButtonlogin: {
    width: width,
    height: height / 10,
    paddingHorizontal: width / 10,
    paddingVertical: height / 40,
    marginTop: width / 7
  },
  styleHeader: {
    width: "100%",
    height: height / 10,
    backgroundColor: "#d2a61fff"
  },
  iconMember: {
    marginTop: width / 15,
    paddingHorizontal: 29
  },
  iconMember1: {
    width: 16,
    height: 16
  }
});
