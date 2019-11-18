import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import React, { PureComponent } from 'react';
import styles from './MainOTPsend.style';
import styles1 from '../Button/OnlyButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import I18n from "../../language/I18n";
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import API from '../../api/APIConstant';
import axios from 'axios';
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
import Moment from 'moment';
import FailureScreen from '../FailureScreen';
let DataSend ='';
let DataSend1 ='';
let option='';
let money='';
let note = '';
let walletId;
let time;
let DataPush;
let DataUser;
let Phone;
const language = [
    { lang: "Tiếng Việt", code: "vi" },
    { lang: "English", code: "en" }
];

class index extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            header: null
        };
    };
    state = {
        code: '',
        isLoading:false,
        Disable:false,
        ShowAlert: false,
        resetOTp: true,
    };
    componentWillMount(): void {
        DataSend = this.props.navigation.getParam('DataSend');
        DataSend1 = this.props.navigation.getParam('DataSend1');
        option =  this.props.navigation.getParam("option");
        money =  this.props.navigation.getParam("money");
        note =  this.props.navigation.getParam("note");
        walletId =  this.props.navigation.getParam("walletId");
        time = Moment().format("YYYY-MM-DD");
        DataPush = this.props.navigation.getParam("DataPush");
        DataUser = this.props.navigation.getParam("DataUser");
        if(option === 'Chuyển tiền'){
            Phone = DataUser.phone_number;
            this._getOTP(Phone);
        }else if(option ==='Nạp tiền'){
            this._sendMoney();
            this.setState({isLoading:false});

        }else if(option === 'Rút Tiền'){
            this._withDraw();
            this.setState({isLoading:false});

        }else if (option === 'Yêu cầu chuyển tiền') {
            try {
                let _staft = this;
                const url = API.baseurl+'/rpc/request';
                const header = {
                    'Content-Type': 'application/json',
                };
                axios({method: 'POST', url: url, headers: header,data:DataSend1})
                    .then((response) => {
                        _staft._storeData();
                        this.props.navigation.navigate("SuccessfulScreen",{option:option});
                        this.setState({isLoading:false});
                    }).catch((error) => {
                    console.log(I18n.t('Ví không tồn tại'));
                    this.setState({isLoading:false});
                });
            }catch(e)
            {
                alert(I18n.t('Ví không tồn tại'));
                this.setState({isLoading:false});
                this.setState({Disable:false});
            }
        }
        console.log(JSON.stringify(DataSend1));

    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem(JSON.stringify(DataUser.phone_number), JSON.stringify(DataPush));
        } catch (error) {
        }
    };
    _onOTP = (code) => {
        this.setState({ code: code });
    };

    _resetOTP = async () => {
        await  this.setState({ code: '' });
        await  this.setState({ resetOTp: false });
        await  this.setState({ resetOTp: true });
        this._getOTP(Phone);
    };

    _ClosePopup = (close) => {
        this.setState({ShowAlert: close});
    };
    _getOTP = (phone) => {
        try{
            const url = API.urlOTP + 'getOtp';
            const data = {
                "mobile": '84'+phone,
                "action": "register"
            };
            const header = {
                'Content-Type': 'application/json',
                'client': '6G-Pay'
            };
            axios({method: 'POST', url: url, data: data, headers: header})
                .then((response) => {
                    if (response.data.success === true){
                        this.setState({
                            dataOTP: response.data,
                            dataTockenOTP: response.data.data
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });

        }catch(e){
            console.log('_getOTP ' + e.error);
        }
    };
    //
    // _checkOTP = (code) => {
    //     try {
    //         let curentDataOtp = this.state.dataTockenOTP;
    //         const url = API.urlOTP + 'checkOtp';
    //         const data = {"id":curentDataOtp.id,"token":code};
    //         const header = {
    //             'Content-Type': 'application/json',
    //             'client': '6G-Pay'
    //         };
    //         axios({method: 'POST', url: url, data: data, headers: header})
    //             .then((response) => {
    //                 if (response.data.success === true){
    //                     this.props.navigation.navigate("SuccessfulScreen",{option:option});
    //                 }else {
    //                     this.setState({
    //                         messageInfoOTP: I18n.t('Ma OTP sai'),
    //                         code: '',
    //                         ShowAlert: true
    //                     });
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error.message);
    //                 this.setState({isLoading: false});
    //             });
    //     }catch (e) {
    //         console.log('_checkOTP ' + e.error);
    //     }
    // };
    _onSubmit = async () => {
        this.setState({Disable:true});
        this.setState({isLoading:true});
        if (this.state.code === '') {
            alert(I18n.t("Vui lòng nhập mã OTP"));
            this.setState({Disable:false});
            this.setState({isLoading:false});
        }else {
            if(option ==='Nạp tiền'){
                this._sendMoney();
                this.setState({isLoading:false});

            }else if(option === 'Rút Tiền'){
                this._withDraw();
                this.setState({isLoading:false});

            }else if(option === 'Chuyển tiền'){
                try {
                    let curentDataOtp = this.state.dataTockenOTP;
                    const url = API.urlOTP + 'checkOtp';
                    const data = {"id":curentDataOtp.id,"token":this.state.code};
                    const header = {
                        'Content-Type': 'application/json',
                        'client': '6G-Pay'
                    };
                    await axios({method: 'POST', url: url, data: data, headers: header})
                        .then((response) => {
                            if (response.data.success === true){
                                let _staft = this;
                                let token = DataUser.tockenCustomer;
                                const header = {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                };
                                const url = API.baseurl+'/rpc/send_money';

                                axios({method: 'POST', url: url, headers: header,data:DataSend})
                                    .then((response) => {
                                        _staft._storeData();
                                        this.props.navigation.navigate("SuccessfulScreen",{option:option});
                                        this.setState({isLoading:false});
                                    }).catch((error) => {
                                    console.log(I18n.t('Ví không tồn tại'));
                                    this.setState({isLoading:false});
                                });
                            }else {
                                this.setState({
                                    messageInfoOTP: I18n.t('Ma OTP sai'),
                                    code: '',
                                    ShowAlert: true,
                                    isLoading:false
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                            this.setState({isLoading: false});
                        });
                }catch(e)
                {
                    alert(I18n.t('Ví không tồn tại'));
                    this.setState({isLoading:false});

                }
            }
        }
    };
    _sendMoney(){
        const url = API.baseurl+ API.topup;
        const header = {
            'Content-Type': 'application/json',
        };
        const accountTopUp = {
            "amount": parseInt(money),
            "message":note,
            "receiver_wallet_id": walletId,
            "timetz": time.toString()
        };
        console.log(accountTopUp);
        axios({method: 'post', url: url, headers: header,  data: accountTopUp })
            .then((response) => {
                this.props.navigation.navigate("SuccessfulScreen",{option:option});
            }).catch((error) => {
        });
    }
    _withDraw(){
        const url = API.baseurl+ API.withdraw;
        const header = {
            'Content-Type': 'application/json',
        };
        const accountWithdraw = {
            "amount": parseInt(money),
            "message": note,
            "sender_wallet_id": walletId,
            "timetz": time.toString()
        };
        axios({method: 'post', url: url, headers: header,  data: accountWithdraw })
            .then((response) => {
                this.props.navigation.navigate("SuccessfulScreen",{option:option});
            }).catch((error) => {
        });
    }
    render() {
        return (
            <View>
                {(option ==='Nạp tiền') || (option === 'Rút Tiền') || (option === 'Yêu cầu chuyển tiền')?
                    <ActivityIndicatorView/>
                    :
                    <View style={styles.container}>
                        {this.state.ShowAlert?<FailureScreen message={this.state.messageInfoOTP} _ClosePopup={this._ClosePopup}/>
                            :
                            <View>
                                <HeaderOnlyBack navigation={this.props.navigation} title={'OTP'}/>
                                <View style={styles.wrapheader}>
                                    <View style={styles.wrapText}>
                                        <View style={styles.wrapText1}>
                                            <Text style={styles.text}>{I18n.t('Mã xác minh')}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.wrapTextinput}>
                                        <View style={styles.wrapImage}>
                                            <Image
                                                style={styles.image1}
                                                source={require('../../assets/icons/ic_phone_1.5px-hdpi.png')}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <View style={styles.wrapOTP}>
                                           {  this.state.resetOTp &&  <OTPInputView
                                                pinCount={4}
                                                codeInputFieldStyle={styles.underlineStyleBase}
                                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                                autoFocusOnLoad
                                                onCodeFilled={this._onOTP}
                                            />}
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.wrapView} onPress={this._resetOTP}>
                                        <Text style={styles.text2}>{I18n.t('Gửi lại mã xác minh')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.viewButtonlogin}>
                                    <TouchableOpacity style={styles1.touchopa1} onPress={this._onSubmit}>
                                        <View style={styles1.loginText}>
                                            <Text style={styles1.TextLogin}>{I18n.t('Xác Nhận')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {this.state.isLoading ?
                                    <ActivityIndicatorView/>
                                    :
                                    null
                                }
                            </View>
                        }
                    </View>
                }
            </View>
        );
    }
}
export default index;
