import React, {Component} from 'react';
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get('screen');

import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import I18n from "../../language/I18n";


class ActivityIndicatorView extends Component {


    render() {
        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
                zIndex:1000,
                backgroundColor: 'rgba(192,192,192,0.3)'
            }}>
                <View style={{
                    width: width,
                    height: height,
                    backgroundColor: 'rgba(192,192,192,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color="#d2a61f"/>
                    <Text>{I18n.t("Hãy chờ trong giây lát")}!!!</Text>
                </View>
            </View>
        );
    }
}

ActivityIndicatorView.propTypes = {
    size: PropTypes.string
};

export  default  ActivityIndicatorView;
