import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions, Platform,PermissionsAndroid
} from 'react-native';
import HeaderSearch from '../Header/HeaderSearch';
const {width, height} = Dimensions.get('screen');
import Contacts from "react-native-contacts";
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tSearch:'',
            alphabet:'',
            dataListFriend:null,
            user:null,
            indexCode:0,
            contacts:[]
        };
        // this._renderItemListContact = this._renderItemListContact.bind(this);
        // this.scrollToIndex = this.scrollToIndex.bind(this);
        // this.goIndex = this.goIndex.bind(this);
    }

    componentDidMount(): void {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contacts",
                message: "This app would like to view your contacts."
            }).then(() => {
                this.getContact();
            });
        } else {
            this.getContact();
        }
    }

    onAlphabetClick = (e) => {
        this.setState({alphabet: e});
    };

    prepareAlphabets = () => {
        let result = [];
        for(let i=65; i<91; i++) {
            result.push(
                <TouchableOpacity onPress={()=>this.goIndex(i)}
                                  style={{width:20,height:20,borderRadius:15,backgroundColor:this.state.indexCode===i?'#d2a61f':'transparent',justifyContent:'center',alignItems:'center'}} key={i}>
                    <Text style={{fontSize:10,fontFamily:'Roboto',color:this.state.indexCode===i?'black':'#fff'}}>{String.fromCharCode(i)}</Text>
                </TouchableOpacity>
            )
        }
        return result;
    };

    _onChangeTSearch = (value)=>{
        this.setState({ tSearch:value });
    };

    valueSearch = () => {
        return this.state.tSearch
    };

    _onClearValue = () =>{
        this.setState({tSearch:''})
    };

    goIndex=(i)=>{
        let numberString = String.fromCharCode(i);
        this.setState({alphabet:numberString,indexCode:i});
        // this.flatListRef.scrollToIndex({animated: true, index:""+ i});
    };

    getContact = () => {
        Contacts.getAll((err, contacts) => {
            if (err === "denied") {
                console.warn("Permission to access contacts was denied");
            } else {
                console.warn(contacts);
                this.setState({ contacts });
            }
        });
    };

    getAvatarInitials = (textString) => {
        if (!textString) return "";

        const text = textString.trim();

        const textSplit = text.split(" ");

        if (textSplit.length <= 1) return text.charAt(0);

        const initials =
            textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

        return initials;
    };

    showNumber = (item,name) => {
        if(item && item.length > 0){
            item.map(phone =>{
                if(phone.hasOwnProperty('label').valueOf('mobile')){
                    return alert('Number phone of '+ name + ' is ' + phone.number);
                }
            })
        }
    };

    search = (text) => {
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
            this.getContact();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
                this.setState({ contacts });
            });
        } else if (emailAddressRegex.test(text)) {
            Contacts.getContactsByEmailAddress(text, (err, contacts) => {
                this.setState({ contacts });
            });
        } else {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
                this.setState({ contacts });
            });
        }
    };

    _renderContacts= ({item,index})=>{
        return (
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginBottom:20}}
                              onPress={()=>this.showNumber(item.phoneNumbers,item.givenName)}
            >
                <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#dddddd",
                        width:width*0.13,
                        height:width*0.13,
                        borderRadius:width*0.065,
                        marginRight:15
                    }}>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            minimumFontScale={0.01}
                            style={{
                                fontWeight: "700",
                                color: "#ffffff"
                            }}
                        >
                            {this.getAvatarInitials(`${item.givenName} ${item.familyName}`)}
                        </Text>
                    </View>

                <View style={{width:'80%'}}>
                    <Text style={{color:'#fff',fontFamily: 'Roboto',fontSize: 16}}>{item.givenName} {item.familyName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={{flex: 1,  marginTop: Platform.OS === 'ios' ? 35 : 0}}>
                <HeaderSearch navigation={this.props.navigation}
                              props={this}
                />
                <ScrollView style={{flex: 1,backgroundColor: '#000',}}>
                    <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:15,paddingTop:20,flex:1}}>
                        <FlatList
                            data={this.state.contacts}
                            numColumns={1}
                            renderItem={this._renderContacts}
                            keyExtractor={(item, index) => {
                                return item.toString() + index.toString();
                            }}
                            extraData={this.state}
                        />
                    </View>

                </ScrollView>
                <View style={{position:'absolute',right:10,borderRadius:15,top:height*0.07+10,alignItems:'center',justifyContent:'space-between'}}>
                    {this.prepareAlphabets()}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

});

