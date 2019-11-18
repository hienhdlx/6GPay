import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  viewlogo: {
    width: width,
    height: height / 2.5,
    alignItems: 'center',
    paddingTop: width / 4,
  },
  TextLogin: {
    fontSize: 16,
    fontWeight: '700',
  },
  loginText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderphone: {
    width: width * 0.8,
    paddingVertical: height / 60,
    height: height / 13,
    flexDirection: 'row',
    marginLeft: width * 0.1,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: width / 2.5,
    backgroundColor: "#FFFFFF"
  },
    borderphone1: {
        width: width * 0.8,
        paddingVertical: height / 60,
        height: height / 13,
        flexDirection: 'row',
        marginLeft: width * 0.1,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height / 8,
        backgroundColor: "#FFFFFF"
    },
  borderImagelogo: {
    height: height / 22,
    flexDirection: 'row',
    marginRight: width / 20,
    alignItems: 'center',
  },

  image1: {
    width: 26,
    height: 17,
  },
  text1: {
    fontSize: 16,
    marginLeft: width * 0.01,
  },

  textinput1: {
    marginTop: Platform.OS === 'ios' ? width / 150 : width / 90,
    justifyContent: 'center',
    width: width / 2,
    color: '#7F7F7F',
    height: 40,
    fontSize: 16,
  },
  ViewPassword: {
    width: width * 0.8,
    height: height / 15,
    flexDirection: 'row',
    marginLeft: width * 0.1,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    marginTop: width * 0.05,
    alignItems: "center"
  },
  viewBorderInputPass: {
    height: height / 22,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewInputPass: {
    width: width / 2,
    color: '#7F7F7F',
    height: 40,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  viewfooter: {
    width: width,
    height: height / 3.5,
  },
  text2: {
    color: '#d2a61f',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '25%',
  },
  viewButtonlogin: {
    width: width,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height,
  },
  touchopa1: {
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
  viewRule: {
    width: width,
    height: height / 10,
    paddingHorizontal: Platform.OS === "ios" ? width / 5 : width / 6,
    paddingVertical: height / 60,
  },
  textLink: {
    color: '#d2a61f',
    paddingHorizontal: width / 10,
  },
  TextButton: {
    paddingHorizontal: width / 10,
    width: width,
    color: "#FFFFFF"
  },
  textcontent: {
    width: width,
    color: "#FFFFFF"
  }
});

