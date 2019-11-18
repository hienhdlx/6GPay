import {Platform, StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {

    backgroundColor: "black",
      height: height,
      width: width,
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
    wrapheader:{
        width: width,
        height: "75%",
    },
  wrapText: {
    marginTop: 69,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapText1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#d2a61fff",
    fontSize: 16,
  },
  textInput: {
    paddingLeft: 5
  },
  wrapTextinput: {
    flexDirection: "row",
    marginTop: 100,
    marginLeft: 24
  },

  textFooter: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  wraptext1: {
    marginTop: 10,
  },
  text1: {
    color: "white",
    fontSize: 20,
  },
  underlineStyleBase: {
    width: 34,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#dededeff"
  },
  wrapOTP: {
    width: "80%",
    height: 35,
    paddingLeft: 13,
  },
  underlineStyleHighLighted: {
    borderColor: "#d2a61f",
  },
  wrapView: {
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  text2: {
    fontSize: 16,
    color: "#a5a5a5ff"
  },
  text3: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: 'bold',
  },
  viewButtonlogin: {
    width: width,
    height: "20%",
    flexDirection: "row",
    paddingHorizontal: width / 10,
    paddingVertical: height / 40,
  }
});
