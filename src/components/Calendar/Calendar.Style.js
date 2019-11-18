import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  wrapView: {
    height: 1,
    backgroundColor: "#dededeff",
    width: 57,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  wrapBody: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#dededeff",
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  wrapBody1: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  styleCalendar: {
    marginTop: width / 10,
    borderRadius: 5
  },
  styleText: {
    color: '#a5a5a5ff',
    fontSize: 14,
    fontWeight: "400"
  },
});
