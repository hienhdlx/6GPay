import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: Platform.OS === 'ios' ? 35 : 0
  },
  wrapheader: {
    height: 56,
    width: "100%",
    backgroundColor: "#d2a61f",
  },
  wrapFirtName: {
    width: width * 0.8,
    height: height / 10,
    flexDirection: "row",
    marginLeft: width * 0.05,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: width/30
  },
  textInput1: {
    width: width*0.65,
    color: "#d2a61f",
    fontSize: 16,
    height: "60%",
  },
  text1: {
    color: '#a5a5a5ff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    marginTop: '2%',
  },
  imageName: {
    width: 18,
    height: 18
  },
  wraptextInput: {
    width: width * 0.65,
    height: height / 10,
    borderBottomWidth: 2,
    borderBottomColor: '#dededeff'
  },
  wrapImage: {
    width: width * 0.15,
    height: height / 10,
    justifyContent: "center",
  },
  wrapFirtEmail: {
    width: width * 0.8,
    height: height / 10,
    flexDirection: "row",
    marginLeft: width * 0.05,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: width * 0.06,
  },
  imageEmail: {
    width: 20,
    height: 15
  },
  imagePass: {
    width: 20,
    height: 25
  },
  wraptext1: {
    marginTop: 10
  },
  textFooter: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "bold",
  },
  wrapfooter: {
    width: 290,
    height: 40,
    backgroundColor: '#d2a61f',
    borderRadius: 10,
    marginHorizontal: 34,
    marginTop: 200
  },
  wrapheaderTop: {
    width: '100%',
    height: height / 10,
    backgroundColor: '#d2a61fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width/5
  },
  text2: {
    color: '#000000ff',
    fontSize: 20,
    fontWeight: '400'
  },
  imageHeader: {
    width: 16,
    height: 16,
  },
  wrapImageHeader: {
    paddingHorizontal: 16,
  },
  viewButtonlogin: {
    width: width,
    height: height / 10,
    paddingHorizontal: width / 10,
    marginTop: height / 13
  },
  wrapView1: {
    width: width * 0.65,
    height: height / 10,
    borderBottomWidth: 2,
    borderBottomColor: '#dededeff'
  },
  wrapText2: {
    color: "#a5a5a5ff",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Roboto",
    marginTop: "4%"
  },
  wrapView2: {
    width: width * 0.65,
    height: height / 10,
    borderBottomWidth: 2,
    borderBottomColor: '#dededeff'
  },
  wrapText3: {
    color: "#a5a5a5ff",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Roboto",
    marginTop: "4%"
  },
  wrapView3: {
    width: width * 0.8,
    height: height / 10,
    flexDirection: "row",
    marginLeft: width * 0.05,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: width * 0.05
  },
  wrapView4: {
    width: width * 0.65,
    height: height / 10,
    borderBottomWidth: 2,
    borderBottomColor: '#dededeff'
  },
  wrapText4: {
    color: "#a5a5a5ff",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Roboto",
    marginTop: "4%"
  },
  wrapView5: {
    width: width * 0.8,
    height: height / 10,
    flexDirection: "row",
    marginLeft: width * 0.05,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: width * 0.016
  },
  wrapView6: {
    width: width * 0.15,
    height: height / 10,
    justifyContent: 'center',
  },
  wrapView7: {
    width: width * 0.65,
    height: height / 16,
    borderBottomWidth: 2,
    borderBottomColor: '#dededeff'
  },
  styleTextInput: {
    width: 249,
    color: '#d2a61f',
    fontSize: 16,
  }
});
