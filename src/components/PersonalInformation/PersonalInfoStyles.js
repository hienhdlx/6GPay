import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default styles = StyleSheet.create({
    ViewBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        padding: 4,
        paddingBottom: 12,
        paddingTop: 12
    },
    ContainerTop: {
        paddingHorizontal: width*0.08,
        paddingTop: 15,
        width: width,
        height: height * 0.72
    },
    ViewReadRequire: {
        paddingBottom: 12,
        paddingTop: 12,
        flexDirection:'row'
    },
    btnBank: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5
    },
    marginR: {
        marginRight: 10
    },
    viewFirst: {
        padding: 4,
        paddingBottom: 12
    },
    viewIDNumber: {
        width:'35%',
        alignItems:'center',
        borderRightWidth: 1,
        borderRightColor: "white",
        flexDirection:'row'
    }
});
