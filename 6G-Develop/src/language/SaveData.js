import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    View, TouchableOpacity
} from 'react-native';

import I18n from '../language/I18n';

const language = [
    {lang:'Tiếng Việt',code:'vi'},
    {lang:'English',code:'en'},
];

export default class SaveData extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            phone: '',
            language : [],
            value:false,
            langValue: '',
            selected : 'Select Language'
        }
        this.persistData = this.persistData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onLanguage = this.onLanguage.bind(this);
        AsyncStorage.getItem('langValue').then((langValue) => {
            this.setState({langValue: langValue})
        });

    }

    persistData(){
        let name = this.state.name
        let phone = this.state.phone
        AsyncStorage.setItem('name', name).done();
        AsyncStorage.setItem('phone', phone).done();
        this.setState({name: name, persistedName: name, phone: phone, persistedPhone: phone })
    }

    onSelectLang(text){
        this.setState({
            value:false,
            select: text.lang,
        }),
            I18n.locale = text.code
        let langValue = text.code;
        AsyncStorage.setItem('langValue',langValue).done();
        this.setState({langValue:langValue});
        // this.props.navigation.navigate('HomePage',{langValue:langValue})

    };

    check(){

        AsyncStorage.getItem('name').then((name) => {
            this.setState({name: name, persistedName: name})
        })

        AsyncStorage.getItem('phone').then((phone) => {
            this.setState({phone: phone, persistedPhone: phone})
        })


    }

    clearData(){
        AsyncStorage.clear();
        this.setState({persistedPhone: '', persistedName: ''})
    }

    onSelectLanguage(){
        return(
            language.map((data,i) => {
                return(
                    <View key={i} style={{}}>
                        <TouchableOpacity onPress={()=>{this.onSelectLang(data)}} style={{margin:5,width:150,height:30,backgroundColor:'#ff9135'}}>
                            <Text style={{color:'#fff',textAlign:'center'}}>{data.lang}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    };

    onLanguage(){
        this.setState({
            value: true
        });

    }


    componentWillMount() {
        this.check();

    }

    render() {
        I18n.locale = this.state.langValue;
        return (
            <View style={{flex: 1, }}>
                <View style={{flex:1}}>
                    <Text>{I18n.t('Hello world')}</Text>
                    <Text>{I18n.t('Thank you')}</Text>
                    <Text>{I18n.t('Bye')}</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={this.onLanguage} style={{width:200,height:50,backgroundColor:'lightblue'}}>
                        <Text>Click vào đây để chọn ngôn ngữ : {this.state.select}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,}}>
                    {(this.state.value)?this.onSelectLanguage():null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#006289',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    input: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black'
    },
});

