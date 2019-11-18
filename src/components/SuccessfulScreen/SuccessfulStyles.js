import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Platform.OS === "ios" ? 35 : 0,
  },
  borderHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.75
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
    height: height * 0.1,
  },
}));
