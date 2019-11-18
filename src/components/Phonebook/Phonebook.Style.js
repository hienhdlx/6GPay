import { Platform, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Platform.OS === 'ios' ? 35 : 0
  },
  wrapheader: {
    height: 56,
    width: "100%",
    backgroundColor: "#d2a61f",
  },
  wrapTopBody: {
    flexDirection: 'row'
  },
  styleImage: {
    width: 26,
    height: 17
  },
  wrapImage: {
    marginTop: 78,
    width: 68,
    height: 25,
    marginLeft: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    flexDirection: 'row',
  },
  styleText: {
    paddingLeft: 5,
  },
  wrapTextphone: {
    width: 206,
    marginLeft: 13,
    padding: 0,
    color: "#dededeff",
    fontSize: 16
  },
  text: {
    fontSize: 16,
    color: '#ffffffff'
  },
  body: {
    marginTop: width / 5,
    paddingHorizontal:width/15
  },
  text1: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "700"
  },
  wrapFlatList: {
    width: '100%',
    height:height/2
  },
  wrapPhone: {
    paddingLeft: width / 20,
    paddingTop: width / 10,
    flexDirection: "row",
  },
  wrapViewFlatList: {
    flexDirection: 'row'
  },
  imageFlatList: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor:'#ffffff'
  },
  text4: {
    color: 'white'
  },
  textPhone1: {
    color: '#a5a5a5ff'
  },
  body1: {
    width: "100%"
  },
  wrapheaderTop: {
    width: "100%",
    height: height / 10,
    backgroundColor: "#d2a61fff",
    flexDirection: "row",
    alignItems: "center"
  },
  wrapImageHeader: {
    paddingHorizontal: 16
  },
  imageHeader: {
    width: 16,
    height: 16
  },
  text2: {
    color: "#000000ff",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: 'Roboto',
  },
  wrapTextInput: {
    marginTop: 78,
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    marginLeft: 5
  },
  styleImage2: {
    width: width / 15,
    height: width / 15
  },
  wrapImage2: {
    marginLeft: height / 4
  },
  styleImage3: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: '#d2a61fff',
    position: "absolute",
    marginTop: width / 4.5,
    marginLeft: width / 7
  },
  imageTick: {
    color: "#000000ff",
    width: 12,
    height: 12,
  },
  wrapImageTick: {
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
