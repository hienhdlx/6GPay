import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    TextInput,
    FlatList, ScrollView,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {PermissionsAndroid} from 'react-native';
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import I18n from '../../language/I18n';
import API from '../../api/APIConstant';
import axios from 'axios';
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import HeaderProfile from '../Header/HeaderProfile';
import styles1 from '../Button/ButtonColor'
import moment from "moment";
let count;
let total=null;
let url;
let urlTopup;
let urlRequest;
let Trans;
let walletID;
let dateSelectFrom;
let request = null;
let CheckWeek;
    let  CheckMonth;
    let topup=null;
    let send=null;
    let receive=null;
    let withdraw=null;
    let cancel=null;
    let option=null
    let dateSelectTo;
    let DataChoice;
    let money;
    let fromMoney;
    let moneyto;
    let day;
    let startday;
    let endday;
    let search;
    let name;
    let number;
let renderData = '';
class Result extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,
        };
    };
    state = {
        dataReQuestSender:[],
        data:[],
        dataCanCelPaymentRequest:[],
        dataTransactionsExternalwidrawal: [] ,
        dataTransactionsExternal:[],
        dataTransactionsReceiver:[],
        dataTransactions:[],
        CheckWeek:false,
        CheckMonth:false,
        CheckOther:false,
        request:null,
        topup:null,
        send:null,
        receive:null,
        withdraw:null,
        cancel:null,
        height1:"",
        firstday:'',
        lastday:'',
        filePath: '',
    };
    constructor(props) {
        super(props);
    }

    askPermission =()=> {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'CameraExample App External Storage Write Permission',
                        message:
                            'CameraExample App needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            this.createPDF();
        }
    };

    dataBody = () => {
        try {
            let dataOption  = this.state.data;
            let  dataRequest = this.state.dataReQuestSender;
            let  dataCancel = this.state.dataCanCelPaymentRequest;
            if (dataOption.length > 0){
                dataOption.map((data)=>{
                    let _option = "    <div class=\"row\" style=\"display: flex; padding: 15px; position: relative; align-items: center;\">\n" +
                        "        <img src=\"src/assets/icons/withdrawal@3x.png\" alt=\"\" class=\"img\" style=\"width: 40px; height: 40px; margin-right: 15px;\">\n" +
                        "        <div class=\"info\" style=\"\">\n" +
                        "            <p class=\"time\" style=\"margin: 0; font-family: sans-serif; font-size: 15px;\">05/11/2019 - 18:35</p>\n" +
                        "            <p class=\"method\" style=\"margin: 0; font-family: sans-serif; font-size: 15px;\">Withdrawn to bank card</p>\n" +
                        "            <p class=\"changes\" style=\"margin: 0; font-family: sans-serif; font-size: 15px; position: absolute; right: 15px; top: 15px;\">- 100000 VND</p>\n" +
                        "        </div>\n" +
                        "    </div>\n";

                    renderData = renderData.concat(_option);
                });
            }
        }catch (e) {
            console.log(e.error);
        }
    };
    async createPDF() {
        try {
            await this.dataBody();
            let dataBody = renderData;
            let _viewHtml = "<body style=\"margin: 0; padding: 0;\">\n" + dataBody + "</body>";
            let options = {
                html: "<body style=\"margin: 0; padding: 0;\">\n" + dataBody + "</body>",
                fileName: '6g-pay',
                directory: '6gpay',
            };
            let file = await RNHTMLtoPDF.convert(options);
            alert("Lưu file thành công" + file.filePath)
            // console.log(file.filePath);
            // this.setState({filePath:file.filePath});
        }catch (e) {
            console.log(e.erro)
        }
    }
    componentWillMount(): void {
            search =  this.props.navigation.getParam("search");
            CheckWeek = this.props.navigation.getParam("CheckWeek");
            CheckMonth =this.props.navigation.getParam("CheckMonth");
            fromMoney=this.props.navigation.getParam("fromMoney");
            moneyto=this.props.navigation.getParam("moneyto");
            total=this.props.navigation.getParam("total");
            walletID=this.props.navigation.getParam("walletID");
            dateSelectFrom = this.props.navigation.getParam("dateSelectFrom");
            dateSelectTo =  this.props.navigation.getParam("dateSelectTo");
            DataChoice= this.props.navigation.getParam("DataChoice");
            console.log(DataChoice);
            if(fromMoney != '' && moneyto != '' ){
                money = '1'
            }
            console.log(parseInt(search) - 1);
            if(search === ""){
                name = null;
                number = null;
            } else{
                if(isNaN(search)){
                    name = '1'
                }else {
                    number = '1'
                }
            }

            if(dateSelectFrom != I18n.t("Từ ngày") && dateSelectTo != I18n.t("Đến ngày") ){
                day = '1'
            }else {
                if(CheckWeek === true){
                    var firstday = moment().subtract(6, 'days').startOf('days').format("YYYY-MM-DD");
                    var lastday = moment().subtract(-1, 'days').endOf('days').format("YYYY-MM-DD");
                    startday=firstday;
                    endday = lastday;
                }else if(CheckMonth === true ){
                    var dateFrom = moment().subtract(30, 'days').startOf('days').format('YYYY-MM-DD');
                    var dateto = moment().subtract(-1,'days').endOf('days').format('YYYY-MM-DD');
                    startday = dateFrom;
                    endday = dateto;
                }
            }
            this.check();
            if(topup === '1' || send === '1' || receive === '1' || withdraw === '1'){
                option=1;
                this._getdata();
            } else if(cancel === '1'||request === '1'){
                option=2;
                 if (cancel === '1' && request === '1'){
                    this._getCanCelPaymentRequest(walletID);
                    this._getTransactionByRequestSender(walletID);
                }else {
                     if(cancel === '1'){
                         this._getCanCelPaymentRequest(walletID);
                     } else if(request === '1') {
                         this._getTransactionByRequestSender(walletID);
                     }
                }
            }



    }
    check(){
        DataChoice.map((item) => {
            if(item.id === 1){
                if(item.Change === true){
                    topup= '1';
                }
            }
            if(item.id === 2){
                if(item.Change === true){
                    send='1'
                }
            }
            if(item.id === 3){
                if(item.Change === true){
                    receive='1'
                }
            }
            if(item.id === 4){
                if(item.Change === true){
                    withdraw='1'
                }
            }
            if(item.id === 5){
                if(item.Change === true){
                    request='1';
                    this.setState({request:'1'})
                }
            }
            if(item.id === 6){
                if(item.Change === true){
                   cancel='1'
                    this.setState({cancel:'1'})
                }
            }
        })
        this._geturl();
    }
    _handlePrice = (price) => {
        try {
            let initPrice = price.replace(/,/g, '');
            let returnTxt = initPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            return returnTxt;
        }catch (e) {
            console.log('_handlePrice' + e.error);
        }
    };
    //request
    _getTransactionByRequestSender = (wellet_id) => {

        try {
            //this.setState({isLoading: true});
            if(name === '1' || number === '1'){
                if(name === '1' && number != '1'){
                    url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + 'sender_full_name=eq.'+ search;
                } else if(number === "1" && name != '1'){
                    url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + 'sender_phone_number' + search;
                }
            }
            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")";
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")" + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" ;
                }
            }else{
                url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataReQuestSender: response.data,
                        // isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                    request = null;
                    console.log(this.state.dataReQuestSender);

                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    _renderRequestSender = ({item, index}) =>{
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.07,justifyContent:'space-between',alignItems:'center',}}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <View style={{
                            width: 35,
                            height: 35,
                            backgroundColor: '#00b141',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius: 35/2,
                        }}>
                            <Image source={require('../../assets/icons/iconchuyen.png')}/>
                        </View>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>   {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.035,fontWeight:'bold',}} numberOfLines={1}>
                            <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>{I18n.t("Gửi đề nghị thanh toán tới")} </Text>
                            {item.receiver_full_name?item.receiver_full_name:null}
                        </Text>
                        {
                            item.message?
                                <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                    <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>"{item.message}"</Text>
                                </Text>
                                :
                                <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                </Text>
                        }

                    </View>
                </View>
            </TouchableOpacity>



        );
    };
    //cancel
    _getCanCelPaymentRequest = (walletId) => {
        try {

            //this.setState({isLoading: true});
            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/requests?receiver_wallet_id=eq.' + walletId + '&request_status=eq.3' + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")";
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/requests?receiver_wallet_id=eq.' + walletId + '&request_status=eq.3' + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/requests?receiver_wallet_id=eq.' + walletId + '&request_status=eq.3' + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }
            }else{
                url = API.baseurl + '/requests?receiver_wallet_id=eq.' + walletId + '&request_status=eq.3' + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataCanCelPaymentRequest: response.data,
                        // isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                    cancel=null;
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    _renderCanCelPaymentRequest = ({item, index}) =>{
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <Image source={require('../../assets/icons/iconPaymentRequest.png')} style={{width:width*0.1,height:width*0.1}}/>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>{item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontWeight:'bold',fontSize:width*0.039}} numberOfLines={2}>
                            {/*{item.sender_full_name?item.sender_full_name:null}*/}
                            <Text style={{fontFamily:'Roboto',fontWeight:'300'}}>{I18n.t("Hủy đề nghị thanh toán từ")} </Text>
                            {item.sender_full_name?item.sender_full_name:null}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };
    //Topup
    _renderTransactionExternalTopup = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
                <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                    // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
                >
                    <View style={{
                        flex: 1,
                        flexDirection:'row',
                    }}>
                        <View style={{width:'20%',alignItems:'center'}}>
                            <Image source={require('../../assets/images/deposit.png')} style={{width:width*0.1,height:width*0.1}}/>
                        </View>
                        <View style={{width:'80%',height:'100%'}}>
                            <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                    {date}
                                </Text>
                                <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>+ {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                            </View>
                            <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.039,fontWeight:'bold',}} numberOfLines={2}>
                                <Text style={{fontFamily:'Roboto', fontWeight:'300'}}> {I18n.t('Bạn Đã Nạp Tiền Vào Ví')} </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
    };
    _getTransactionExternalTopup = (walletId) => {
        try {

            //this.setState({isLoading: true});
            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId +  "&type=eq.topup" + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ')';
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId +  "&type=eq.topup" + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId +  "&type=eq.topup" + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }
            }else{
                url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId +  "&type=eq.topup" + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            console.log(url)
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactionsExternal: response.data,
                        isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    //widrawal
    _renderTransactionExternalwidrawal = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
                <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                    // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
                >
                    <View style={{
                        flex: 1,
                        flexDirection:'row',
                    }}>
                        <View style={{width:'20%',alignItems:'center'}}>
                            <Image source={require('../../assets/icons/withdrawal.png')} style={{width:width*0.1,height:width*0.1}}/>
                        </View>
                        <View style={{width:'80%',height:'100%'}}>
                            <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                    {date}
                                </Text>
                                <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>- {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                            </View>
                            <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.039,fontWeight:'bold',}} numberOfLines={2}>
                                <Text style={{fontFamily:'Roboto', fontWeight:'300'}}> {I18n.t('Bạn Đã Nạp Tiền Vào Ví')} </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
    };
    _getTransactionExternalwidrawal = (walletId) => {
        try {
            //this.setState({isLoading: true});

            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' +  walletId + "&type=eq.withdrawal" + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")";
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' +  walletId + "&type=eq.withdrawal" + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/external_transactions?wallet_id=eq.' +  walletId + "&type=eq.withdrawal" + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }
            }else{
                url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId +  "&type=eq.topup" + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            console.log(url);
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactionsExternalwidrawal: response.data,
                        isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    //chuyentienchoban
    _renderTransactionReceiver = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <Image source={require('../../assets/icons/sendmony.png')} style={{width:width*0.1,height:width*0.1}}/>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>+ {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.039,fontWeight:'bold',}} numberOfLines={2}>
                            <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>{I18n.t("chuyển tiền cho bạn")} </Text>
                            {item.sender_full_name?item.sender_full_name:null}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    _getTransactionReceiver = (wellet_id) => {
        try {
            //this.setState({isLoading: true});
            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/transactions?receiver_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")";
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/transactions?receiver_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/transactions?receiver_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }
            }else{
                url = API.baseurl + '/transactions?receiver_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }

            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactionsReceiver: response.data,
                        // isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };
    //send
    _renderTransaction = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':'+  ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <Image source={require('../../assets/icons/sendmony.png')} style={{width:width*0.1,height:width*0.1}}/>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>-  {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontWeight:'bold',fontSize:width*0.039}} numberOfLines={2}>
                            {/*{item.sender_full_name?item.sender_full_name:null}*/}
                            <Text style={{fontFamily:'Roboto',fontWeight:'300'}}>{I18n.t("chuyển tiền đến")} </Text>
                            {item.receiver_full_name?item.receiver_full_name:null}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };
    _getTransactionsSender = (wellet_id) => {
        try {
            //this.setState({isLoading: true});

            if(money === '1' || day === '1'){
                if(money === '1' && day != '1'){
                    url = API.baseurl + '/transactions?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")";
                } else if(day === "1" && money != '1'){
                    url = API.baseurl + '/transactions?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
                }else if(money === '1' && day === '1'){
                    url = API.baseurl + '/transactions?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' + "&and=(amount.gte."+ fromMoney +",amount.lte." + moneyto + ")" + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ')';
                }
            }else{
                url = API.baseurl + '/transactions?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc' +  '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactions: response.data,
                        // isLoading: false
                    });
                    url=null;
                    money=null;
                    day=null;
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    //idiot  : http://3.124.107.180:3000/transactions?
    // or=(sender_wallet_id.eq.96,receiver_wallet_id.eq.96)
    // &and=(amount.gte.100,amount.lte.2100000)
    // &and=(timestamp.gte.2019-10-20,timestamp.lte.2019-11-30)
    // &or=(type.eq.withdrawal,type.eq.topup,type.is.null)
    _geturl = (walletId) =>{

        urlTopup = 'http://3.124.107.180:3000/transactions?&order=timestamp.desc';
            if(money === '1'){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&and=(amount.gte.'+fromMoney+',amount.lte.'+ moneyto + ')';
            }
            if(day === '1'){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&and=(timestamp.gte.' + dateSelectFrom +',timestamp.lte.' + dateSelectTo + ")";
            }else if(day !== '1'){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&and=(timestamp.gte.' + startday +',timestamp.lte.' + endday + ")";
            }
            //0000
            //1000 done
            if(topup === '1' && withdraw !== '1' && receive !== '1' &&  send !== '1'){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup)";
            }
            //1100 done
            if(topup === '1' && withdraw === '1' && receive !== '1' &&  send !== '1' ){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup)';
            }
            //1001 done
            if(topup === '1' && withdraw !== '1' && receive !== '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&order=timestamp.desc' + '&receiver_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&order=timestamp.desc' + '&receiver_full_name=eq.' + search;
                    }
                }else {
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + "&or=(type.eq.topup,type.is.null)";
                }
                }

            //1010 done
            if(topup === '1' && withdraw !== '1' && receive === '1' &&  send !== '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&sender_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&sender_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)";
                }

            }
            //1011 done
            if(topup === '1' && withdraw !== '1' && receive === '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&or=(sender_full_name.eq.' + search + ',receiver_full_name.eq.'+search+')';
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)" + '&or=(sender_phone_number.eq.' + search + ',receiver_phone_number.eq.'+search+')';
                    }
                }else {
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.topup,type.is.null)"
                }
            }
            //1101 done
            if(topup === '1' && withdraw === '1' && receive !== '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)' + '&receiver_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)' + '&receiver_phone_number=eq.' + search;
                    }
                }else {
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)';
                }

            }
            //1110 done
            if(topup === '1' && withdraw === '1' && receive === '1' &&  send !== '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)' + '&sender_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)' + '&sender_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.eq.withdrawal,type.eq.topup,type.is.null)';
                }

            }
            //1111 done
            if( topup === '1' && withdraw === '1' && receive === '1' && send === '1' ){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal,type.eq.topup)' + '&or=(sender_full_name.eq.' + search + ',receiver_full_name.eq.'+search+')';
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal,type.eq.topup)' + '&or=(sender_phone_number.eq.' + search + ',receiver_phone_number.eq.'+search+')';
                    }
                }else{
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal,type.eq.topup)';
                }
            }
            //0111 done
            if( topup !== '1' && withdraw === '1' && receive === '1' && send === '1' ){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal)' + '&or=(sender_full_name.eq.' + search + ',receiver_full_name.eq.'+search+')';
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal)' + '&or=(sender_phone_number.eq.' + search + ',receiver_phone_number.eq.'+search+')';
                    }
                }else{
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + '&or=(type.is.null,type.eq.withdrawal)';
                }

            }
            //0100 done
            if(withdraw === '1'&& topup !== '1' && receive !== '1' &&  send !== '1'){
                urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.withdrawal)";
            }
            //0001 done
            if( topup !== '1'&& withdraw !== '1' && receive !== '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+'&or=(type.is.null)' + '&receiver_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+'&or=(type.is.null)' + '&receiver_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+'&or=(type.is.null)';
                }

            }
            //0010 done
            if( topup !== '1'&& withdraw !== '1' && receive === '1' &&  send !== '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)' + '&sender_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)' + '&sender_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup + '&or=('+'receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)';
                }

            }
            //0011 done
            if(withdraw !== '1'&& topup !== '1' && receive === '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)' + '&or=(sender_full_name.eq.' + search + ',receiver_full_name.eq.'+search+')';
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)' + '&or=(sender_phone_number.eq.' + search + ',receiver_phone_number.eq.'+search+')';
                    }
                }else{
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID+',receiver_wallet_id.eq.'+ walletID +')'+'&or=(type.is.null)';
                }

            }
            //0101 done
            if(withdraw === '1'&& topup !== '1' && receive !== '1' &&  send === '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+ "&or=(type.eq.withdrawal,type.is.null)" + '&receiver_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+ "&or=(type.eq.withdrawal,type.is.null)" + '&receiver_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup + '&or=(sender_wallet_id.eq.'+walletID +')'+ "&or=(type.eq.withdrawal,type.is.null)";
                }

            }
            //0110 done
            if(withdraw === '1'&& topup !== '1' && receive === '1' &&  send !== '1'){
                if(name === '1' || number === '1'){
                    if(name === '1' && number != '1'){
                        urlTopup = urlTopup +'&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.withdrawal,type.is.null)" + '&sender_full_name=eq.'+ search;
                    } else if(number === "1" && name != '1'){
                        urlTopup = urlTopup +'&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.withdrawal,type.is.null)" + '&sender_phone_number=eq.' + search;
                    }
                }else{
                    urlTopup = urlTopup +'&or=('+'receiver_wallet_id.eq.'+ walletID +')' + "&or=(type.eq.withdrawal,type.is.null)";
                }

            }
            console.log(urlTopup);
    };
    _getdata(){

        try {

            //this.setState({isLoading: true});
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: urlTopup, headers: header})
                .then((response) => {
                    this.setState({
                        data: response.data,
                    });
                    urlTopup=null;
                    money=null;
                    day=null;
                    topup=null;
                    send=null;
                    receive=null;
                    withdraw=null;
                    option=null;
                })
                console.log(this.state.data)
                .catch((error) => {
                    console.log(error.message);
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    }
    _render = ({item,index}) => {
        let dau= '';
        let image = '';
        let mess='';
        if(item.type === 'topup'){
            dau='+';
            image= require('../../assets/images/deposit.png');
            mess= I18n.t("Bạn Đã Nạp Tiền Vào Ví");
        }else
        if(item.type === 'withdrawal'){
            dau='-';
            image= require('../../assets/icons/withdrawal.png');
            mess= I18n.t("Rút tiền về thẻ đã liên kết");
        }else
        if(item.type === null ){
            dau='-';
            image= require('../../assets/icons/sendmony.png');
            if(item.sender_wallet_id === walletID){
                mess= I18n.t("Chuyển tiền đến") +' ' + item.receiver_full_name;
                dau='-';
            }else if(item.receiver_wallet_id === walletID) {
                mess= I18n.t("chuyển tiền cho bạn") +' ' + item.sender_full_name;
                dau='+';
            }
        }

        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':' + date.getMinutes();
        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.07,justifyContent:'space-between',alignItems:'center', }}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <Image source={image} style={{width:width*0.1,height:width*0.1}}/>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}> {dau} {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.035,fontWeight:'bold',}}>
                            <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>{mess}</Text>
                            {/*{item.sender_full_name?item.sender_full_name:null}*/}
                        </Text>
                        {
                            item.message?
                                <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                    <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>"{item.message}"</Text>
                                </Text>
                                :
                                <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                </Text>
                        }

                    </View>
                </View>
            </TouchableOpacity>
        );
    };




    render() {
        return (
            <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0,backgroundColor:'#000000', height: height}}>
                <HeaderOnlyBack navigation={this.props.navigation} title={'ketqua'}/>
                <View style={{flex:1,paddingHorizontal: 10,marginTop:width/10}}>
                    <ScrollView nestedScrollEnabled={true}>
                    {
                        this.state.dataReQuestSender.length>0 ?
                                    <View style={{paddingHorizontal:20,marginTop:10,width:width, height: height/option }} >
                                        {/*list history*/}
                                        <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#d2a61f',paddingBottom:3}}>
                                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.039,}}>{I18n.t("request")}</Text>
                                        </View>
                                        <ScrollView nestedScrollEnabled={true}>
                                            <FlatList
                                                data={this.state.dataReQuestSender}
                                                numColumns={1}
                                                renderItem={this._renderRequestSender}
                                                keyExtractor={(item, index) => {
                                                    return item.toString() + index.toString();
                                                }}
                                            />
                                        </ScrollView>
                                    </View>:null
                    }
                    {
                        this.state.dataCanCelPaymentRequest.length>0 ?
                            <View style={{paddingHorizontal:20,marginTop:10,width:width, height: height/option }} >
                                {/*list history*/}
                                <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#d2a61f',paddingBottom:3}}>
                                    <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.039,}}>CanCel Payment Request</Text>
                                </View>
                                <ScrollView nestedScrollEnabled={true}>
                                    <FlatList
                                        data={this.state.dataCanCelPaymentRequest}
                                        numColumns={1}
                                        renderItem={this._renderCanCelPaymentRequest}
                                        keyExtractor={(item, index) => {
                                            return item.toString() + index.toString();
                                        }}
                                    />
                                </ScrollView>
                            </View>:null
                    }

                        {
                            this.state.data.length > 0 ?
                                <View style={{paddingHorizontal:20,marginTop:10,width:width, height: height/option }} >
                                    <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#d2a61f',paddingBottom:3}}>
                                        <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.039,}}>{I18n.t("Lịch sử")}</Text>
                                    </View>
                                    {/*list history*/}
                                    <ScrollView nestedScrollEnabled={true}>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={1}
                                        renderItem={this._render}
                                        keyExtractor={(item, index) => {
                                            return item.toString() + index.toString();
                                        }}
                                    />
                                    </ScrollView>
                                </View>
                                :null
                        }



                    </ScrollView>
                    <View style={styles1.viewButton}>
                        <View style={styles1.viewButtonsmall}>
                            <TouchableOpacity
                                onPress = {() => this.props.navigation.navigate('MainScreen')}
                                style={{
                                    height: height / 14,
                                    width: width / 3,
                                    marginBottom: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    backgroundColor: '#d2a61f',
                                    marginTop: 5,
                                    marginRight: width / 15,
                                }}>
                                <View style={styles1.viewTouchsmall}>
                                    <Text style={styles1.text6}>{I18n.t("Close")}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles1.viewButton2}
                            onPress={()=>{this.askPermission()}}
                            >
                                <View style={styles1.viewTouchsmall}>
                                    <Text style={styles1.text6}>
                                       {I18n.t("Export")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}


export default Result;
