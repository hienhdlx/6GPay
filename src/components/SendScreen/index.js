import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
} from "react-native";
import styles from "./SendScreen.styles";
import styles1 from "../Button/ButtonColor";
let check = '';
let balance='';
let UserSendwalletId = '';
let DataUser='';
const { width, height } = Dimensions.get("screen");
import I18n from 'react-native-i18n';
import React, { Component } from "react";
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import API from '../../api/APIConstant';
import axios from 'axios';
let DataUserReceiver;
let base64Icon = 'data:image/png;base64,';
import Moment from 'moment';
import FailureScreen from '../FailureScreen/index';
let time;
let DataPush;
const priceRegex = /(\d)(?=(\d{3})+(?!\d))/gi;
class index extends Component {
    state: {
        ErrorMoney: "Số tiền không được vượt quá 20.000.000 VND"
    };
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            header: null
        };
    };
    state = {
        money: '',
        Receiver_walletID:'',
        DataUserReceiver:'',
        erro:null,
        erro1:null,
        note:'',
        RecieverNumber:'',
        ShowAlert: false,
        Message: '',

    };
    _ClosePopup = (close) => {
        this.setState({ShowAlert: close});
    };
    _onSubmit = () => {
        const { money, } = this.state;
        let fomatmoney = ''
        money.split('.').forEach(element => {
            fomatmoney = fomatmoney + element
        });
        if ( money === '') {
            //alert(I18n.t("Vui lòng nhập số tiền"));
            this.setState({ShowAlert: true, Message: I18n.t('Vui lòng nhập số tiền')});
        } else {
            if (check === 'Chuyển tiền') {
                try {
                    let DataSend ={
                        "amount": fomatmoney,
                        "message": this.state.note.trim(),
                        "receiver_wallet_id": this.state.Receiver_walletID,
                        "timetz": time.toString(),
                        "sender_wallet_id": UserSendwalletId
                    };
                    console.log('moneySend', fomatmoney)
                    this.props.navigation.navigate("MainOTPsend",{DataSend:DataSend,option:'Chuyển tiền', DataUser: DataUser,DataPush:DataPush});
                    this.setState({erro:null});
                }catch(e)
                {
                    console.log(e.error);
                }
            }else if (check === 'Yêu cầu chuyển tiền'){
                try {
                    let DataSend1 ={
                        "sender_wallet_id":UserSendwalletId ,
                        "amount": fomatmoney,
                        "message": this.state.note.trim(),
                        "requeststatus": "0",
                        "eduction_request_id": "",
                        "phonenumber":this.state.RecieverNumber,

                };
                    console.log(DataSend1);
                    this.props.navigation.navigate("MainOTPsend",{option:'Yêu cầu chuyển tiền',DataSend1:DataSend1,DataPush:DataPush,DataUser:DataUser});
                }catch(e)
                {
                    console.log(e.error);
                }
            }
        }
    };
    _formatThousand(numStr) {
        let returnTxt;
        if (numStr.length > 3) {
            returnTxt = numStr.replace(priceRegex, '$1.');
        } else {
            returnTxt = numStr
        }
        return returnTxt;
    };
    _onChangemoney = text => {
        let initPrice = text.replace(/\D|^0+/gi, ''),
            formatedPrice = this._formatThousand(initPrice);
        if(check === 'Chuyển tiền'){
            if (text === ' ' || text === 0 || text=== '-') {
                this.setState({
                    //money: text.replace(/\D|^0+/g, ''),
                    money: formatedPrice
            });
            } else {
                if(balance < parseInt(initPrice)){
                    this.setState({ money: this.state.money });
                    this.setState({erro:"1"});
                }else{
                    this.setState({
                        //money: text.replace(/\D|^0+/g, ''),
                         money: formatedPrice });
                    this.setState({erro: null});
                }
            }
        } else{
            if (text == ' ' || text == 0 || text== '-') {
                this.setState({
                     //money: text.replace(/\D|^0+/g, '')
                     money: formatedPrice
                    });
            } else {
                if( parseInt(text) > 20000000){
                    this.setState({ money: this.state.money });
                    this.setState({erro1:"1"});
                }else{
                    this.setState({
                        //money: text.replace(/\D|^0+/g, '')
                        money: formatedPrice
                    });
                    this.setState({erro1: false});
                }
            }
        }
    };
    componentWillMount(): void {
        check = this.props.navigation.getParam("commit");
        time = Moment().format("YYYY-MM-DD");
        balance = this.props.navigation.getParam('balance');
        DataUserReceiver = this.props.navigation.getParam("DataUserReceiver");
        UserSendwalletId = this.props.navigation.getParam("UserSendwalletId");
        DataUser = this.props.navigation.getParam("DataUser");
        DataPush = this.props.navigation.getParam("DataPush");
        console.log(DataUserReceiver);

        try {
            const url = API.baseurl +API.getUserByUserID + DataUserReceiver.user_id;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({Receiver_walletID:response.data[0].wallet_id});
                    this.setState({RecieverNumber:response.data[0].phone_number})
                    console.log(this.state.RecieverNumber);
                }).catch((error) => {
                alert(error.message);
            });
        }catch(e)
        {
            console.log(e.error);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.ShowAlert ? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
                    :
                <View>
                <HeaderOnlyBack navigation={this.props.navigation}  title={check} />
                <ScrollView style={styles.viewScroll}>
                <View style={styles.infor}>
                    <Image
                        style={{
                            width: 90,
                            height: 90,
                            backgroundColor: '#ffffff',
                            borderRadius: 100,
                        }}
                        source={{uri: base64Icon + DataUserReceiver.photo}}
                    />
                    <Text style={styles.textinfoName}> {DataUserReceiver.full_name} </Text>
                    <Text style={styles.textinfophone}>+84 {DataUserReceiver.phone_number} </Text>
                    {
                        this.state.erro ?
                            <Text style={styles.textmoneyError}>
                                {I18n.t('sotienkhongvuot')}
                            </Text>
                            :
                            <Text style={styles.textmoneyError}>
                            </Text>
                    }
                    {
                        this.state.erro1 ?
                            <Text style={styles.textmoneyError}>
                                {I18n.t('sotien5tr')}
                            </Text>
                            :
                            <Text style={styles.textmoneyError}>
                            </Text>
                    }

                </View>
                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <Image source={require('../../assets/images/Group.png')} />
                    </View>
                    <View style={styles.view3 }>
                        <TextInput
                            keyboardType = {'number-pad'}
                            onChangeText={this._onChangemoney}
                            value={this.state.money}
                            style={styles.text1}
                            />
                    </View>
                    <View style={styles.view4}>
                        <Text style={[styles.text1,{ fontWeight: 'bold',}]}>VND</Text>
                    </View>
                </View>
                <View style={styles.viewnote}>
                    <TextInput
                        style={styles.text2}
                        placeholder={I18n.t("Ghi chú")}
                        placeholderTextColor="#727272"
                        onChangeText={(text)=>{this.setState({note:text})}}
                    />
                </View>
                <View style={styles.view5}>
                    <View style={styles.view6}>
                        <Text style={styles.text3}> {I18n.t('Dịch vụ')}</Text>
                        <Text style={styles.text3}> {I18n.t('Phí Giao Dịch')}</Text>
                    </View>
                    <View style={[styles.view6,{alignItems:'flex-end'} ]}>
                        <Text style={styles.text4}>  {I18n.t(check)}</Text>
                        <Text style={styles.text4}>  {I18n.t('Miễn Phí')}</Text>
                    </View>
                </View>
                <View style={styles1.viewButton}>
                    <View style={styles1.viewButtonsmall}>
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.navigate('PhoneBook')}
                            style={styles1.ViewTouch}>
                            <View style={styles1.viewTouchsmall}>
                                <Text style={styles1.text6}>  {I18n.t('Huỷ')}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {this._onSubmit}
                            style={styles1.viewButton2}>
                            <View style={styles1.viewTouchsmall}>
                                <Text style={styles1.text6}>  {I18n.t('Xác Nhận')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                </View>
                }
            </View>
        );
    }
}
export default index;
