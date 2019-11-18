import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default styles = StyleSheet.create({
    TextAssociate: {
        color: "white",
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 20
    },
    Item: {
        width: "33.33%",
        padding: 5
    },
    btnBank: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5
    }
});
