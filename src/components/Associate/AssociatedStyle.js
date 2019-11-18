import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
    ViewBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        padding: 2,
        paddingBottom: 10,
        paddingTop: 10
    },
    textCondition: {
        color: "white",
        marginTop: 15,
        marginBottom: 15,
        fontSize: width*0.04
    },
    conditionsItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    dotItem: {
        width: 6,
        height: 6,
        marginRight: 8
    }
});
