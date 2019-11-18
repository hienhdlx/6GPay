import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default (styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 0.25 * height,
    marginTop: '50%',
    marginLeft: width * 0.05,
    borderRadius: 10,
    backgroundColor: '#FFFFFF'
  },
  viewHeader: {
    width: width * 0.9,
    height: 0.15 * height,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
    borderBottomWidth: 2,
    borderBottomColor: '#CBCBCB'
  },
  textHeader: {
    color: '#727272',
    fontSize: 16,
    fontWeight: '400',
    textAlign:'center',
    paddingVertical: height / 30,
  },
  viewFooter: {
    width: width * 0.9,
    height: 0.1 * height,
    borderBottomLeftRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTouch: {
    width: width * 0.3,
    height: 0.05 * height,
    borderRadius: 10,
    backgroundColor: '#d2a61f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFooter: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700'
  }
}));
