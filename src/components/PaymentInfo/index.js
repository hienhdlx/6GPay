import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions, Platform, Alert, ActivityIndicator, AsyncStorage
} from 'react-native';
import HeaderProfile from '../Header/HeaderProfile';
import I18n from '../../language/I18n';
import styles1 from '../Button/ButtonColor';
import API from '../../api/APIConstant';
import axios from 'axios';
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
import FailureScreen from "../FailureScreen";
const {width, height} = Dimensions.get('screen');
let name;
let dataSchool;
let DataUser;
let base64Icon = 'data:image/png;base64,';
let balance;
export default class index extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSchool:'',
            isDisabled: false,
            DataPush:'',
        };
    }
    componentDidMount(): void {
        dataSchool = this.props.navigation.getParam('dataSchool');
        console.log(dataSchool);
        name = this.props.navigation.getParam('name');
        DataUser = this.props.navigation.getParam('DataUser');
        this.setState({dataSchool});
        balance = this.props.navigation.getParam('balance');
        console.log(balance);
        console.log(dataSchool.amount);

        this._retrieveData();
        try {
            const url = API.baseurl + '/users?wallet_id=eq.' + dataSchool.sender_wallet_id;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    console.log(response.data[0]);
                    this.state.DataPush.unshift(response.data[0]);
                    console.log(this.state.DataPush);
                    this.setState({
                        isLoading: false
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
}
    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            header: null

        };
    };
    _ClosePopup = (close) => {
        this.setState({ShowAlert: close});
        this.setState({isLoading:close});
    };
    _retrieveData = async () => {
        try {
            let value = await AsyncStorage.getItem(JSON.stringify(DataUser.phone_number));
            if (value !== null) {
                console.log(JSON.parse(value));
                let DataCallBack = JSON.parse(value);
                const newArray = [];
                DataCallBack.forEach(obj => {
                    if (!newArray.some(o => o.user_id === obj.user_id)) {
                        newArray.push({...obj});
                    }
                });
                this.setState({DataPush: newArray});
                console.log(this.state.DataPush);
            }
        } catch (error) {
        }
    };

    _cancel = (dataSchool) => {
        try {
            const url = API.baseurl + '/requests?requests_id=eq.' + dataSchool.requests_id;
            const header = {
                'Content-Type': 'application/json',
            };
            const data = {"request_status": "3"};
            axios({method: 'PATCH', url: url, headers: header, data: data})
                .then((response) => {
                    this.props.navigation.navigate("MainScreen");
                    this.setState({ isLoading: false });
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({ isLoading: false });
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    _enibaleButton = () => {
        this.setState({ isDisabled: false });
    }
    storeData = async () => {
        try {
            await AsyncStorage.setItem(JSON.stringify(DataUser.phone_number), JSON.stringify(this.state.DataPush));
        } catch (error) {
        }
    };
    _onSubmit = () => {
        if (dataSchool.amount > balance) {
            this.setState({ShowAlert: true, Message: I18n.t('Số dư ví không đủ')});
        }else {
            this.storeData();
            this.setState({ isDisabled: true });
            this.props.navigation.push('MainOTP',{
                    paymentInfo:true,
                    dataSchool: dataSchool,
                    DataUser: DataUser,
                    enibaleButton: this._enibaleButton
                }
            )
        }

    };
    formatNumber = (num) =>  {
        if (num === undefined) return ""
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }
    render() {
        let {dataSchool} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: '#000000',marginTop: Platform.OS === "ios" ? 35 : 0,}}>
                <HeaderProfile navigation={this.props.navigation} editPayment={true}/>
                {this.state.ShowAlert ? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
                    :
                    <View style={{flex: 1}}>
                        <View style={{height: '30%', alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 100,
                                }}
                                source={{uri: base64Icon + dataSchool.photo}}
                            />
                            <Text style={{
                                fontFamily: 'Roboto',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 20,
                                marginTop: 5
                            }}>{dataSchool.sender_full_name}</Text>
                        </View>
                        <View style={{height: '50%', alignItems: 'center'}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '85%',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/images/wallet.png')}/>
                                <Text style={{
                                    fontFamily: 'Roboto',
                                    color: '#fff',
                                    fontSize: width * 0.044
                                }}>{I18n.t("Tài khoản chuyển")}</Text>
                                <Text style={{
                                    fontFamily: 'Roboto',
                                    color: '#fff',
                                    fontSize: width * 0.044,
                                    fontWeight: 'bold'
                                }}>{this.formatNumber(dataSchool.amount)} VND</Text>
                            </View>
                            {
                                dataSchool.message ?
                                    <Text style={{
                                        fontFamily: 'Roboto',
                                        color: '#727272',
                                        fontSize: width * 0.044,
                                        marginTop: 20
                                    }}>"{dataSchool.message}"</Text>
                                    : null
                            }
                        </View>
                        <View style={styles1.viewButton}>
                            <View style={styles1.viewButtonsmall}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            I18n.t('Bạn có chắc muốn hủy yêu cầu này'),
                                            '',
                                            [
                                                {
                                                    text: I18n.t('Không'),
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {text: I18n.t('Có'), onPress: () => this._cancel(dataSchool)},
                                            ],
                                            {cancelable: false},
                                        );
                                    }}
                                    style={styles1.ViewTouch}>
                                    <View style={styles1.viewTouchsmall}>
                                        <Text style={styles1.text6}>{I18n.t('Huy1')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._onSubmit}
                                    style={styles1.viewButton2}>
                                    <View style={styles1.viewTouchsmall}>
                                        <Text style={styles1.text6}>{I18n.t('Xác Nhận')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                {this.state.isLoading ?
                    <ActivityIndicatorView/>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
