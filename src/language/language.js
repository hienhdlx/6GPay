import React, {Component} from 'react';
import {
    Dimensions, Image, Platform, StatusBar, Text, View,TouchableOpacity,AsyncStorage
} from 'react-native';
import I18n from '../language/I18n';
const {width, height} = Dimensions.get('screen');
const isIphoneX = () => {
    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&
        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
};
const STATUSBARHEIGHT = Platform.OS === 'ios' ? isIphoneX() ? 30 : 20 : 0;

const language = [
    {lang:'Tiếng Việt',code:'vi'},
    {lang:'English',code:'en'},
];

class languages extends  Component{
    constructor(){
        super();
        this.state = {
            language : [],
            value:false,
            langValue: 'vi',
            selected : 'Select Language'
        };
        this.onLanguage = this.onLanguage.bind(this);
    }
    onSelectLanguage(){
        return(
            language.map((data,i) => {
                return(
                    <View key={i} style={{}}>
                        <TouchableOpacity onPress={()=>{this.onSelectLang(data)}}>
                            <Text>{data.lang}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    };

    onSelectLang(text){
        this.setState({
            value:false,
            select: text.lang,
        }),
            I18n.locale = text.code;
    };

    onLanguage(){
        this.setState({
            value: true
        })
    }

    render(){
        I18n.locale = 'vi';
        return(
            <View style={{flex: 1, }}>
                <View style={{flex:1}}>
                    <Text>{I18n.t('Hello world')}</Text>
                    <Text>{I18n.t('Thank you')}</Text>
                    <Text>{I18n.t('Bye')}</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={this.onLanguage} style={{width:100,height:100,backgroundColor:'lightblue'}}>
                        <Text>{this.state.select}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    {(this.state.value)?this.onSelectLanguage():null}
                </View>
            </View>
        );
    }
}

export default languages;
