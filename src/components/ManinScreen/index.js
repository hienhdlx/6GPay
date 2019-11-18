import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions, Platform, ActivityIndicator, RefreshControl, BackHandler
} from 'react-native';
import I18n from '../../language/I18n';
import API from '../../api/APIConstant';
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
import axios from 'axios';
import FailureScreen from '../FailureScreen/index';
const {width, height} = Dimensions.get('screen');
let DataUser = '';
let user_id;
let walletID
 class MainScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataReceiverWallet: [],
            dataTransactions: [],
            dataTransactionsReceiver: [],
            dataTransactionsExternal: [],
            dataReQuestSender: [],
            dataDebitCardByUserId: [],
            dataCanCelPaymentRequest: [],
            isShowPoup: false,
            DataUserSend:'',
            isLoading: false,
            refreshing: false,
            count:0,
            datatrans:[],
            dau:'',
            offset:10,
            image:'',
            show:'1',
            ShowAlert: false,
            Message: '',
        };
    }
    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return {
            header: null
        };
    };
    _ClosePopup = (close) => {
        this.setState({ShowAlert: close});
    };
    _onToProfile = () => {
        this.props.navigation.navigate("EditProfile",{DataUser:DataUser});
    };
    _onToMenu = () => {
        this.props.navigation.navigate("Menu" ,
            {
                DataUser: DataUser
            }
            );
    };
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigation.navigate('SplashScreen')
          return true;
        });
      };
      componentWillUnmount() {
        this.backHandler.remove();
      }  
    componentWillMount(): void {
        this.setState({isLoading:true});
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({isLoading:true});
                user_id =  this.props.navigation.getParam("idUser");
                DataUser = this.props.navigation.getParam('DataUser');
                this.setState({DataUserSend:DataUser});
                if (user_id !== null || user_id !== undefined || user_id !== ''){
                    this._getWalletByUserId(user_id);
                    this._getDebitCardByUserId(user_id);
                }
            }
        );
    }
    _onRefresh = () => {
        this._getWalletByUserId(user_id);
        this._getDebitCardByUserId(user_id);
    };

    _getDebitCardByUserId = (user_id) => {
        try {
            const url = API.baseurl + '/debit_card?user_id=eq.' + user_id;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataDebitCardByUserId: response.data,
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
    };

    /**
     * get wallet by user id
     * return balance, walletId, type, timestamp
     * string
     * */
    _getWalletByUserId = (user_id) => {
        try {
            // this.setState({isLoading: true});
            const url = API.baseurl + API.getWalletbyIdUser(user_id);
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        data: response.data,
                        balance: response.data[0].balance,
                        walletId: response.data[0].wallet_id,
                        type: response.data[0].type,
                        timestamp: response.data[0].timestamp,

                    });
                    console.log(this.state.balance);
                    walletID = response.data[0].wallet_id
                    this._getReceiverWalletId(response.data[0].wallet_id);
                    this._getUserIdByWalletId(response.data[0].wallet_id);
                    this._getTransactionsSender(response.data[0].wallet_id);
                    this._getTransactionReceiver(response.data[0].wallet_id);
                    this._getTransactionExternal(response.data[0].wallet_id);
                    this._getTransaction(response.data[0].wallet_id, 10);
                    this._getTransactionByRequestSender(response.data[0].wallet_id);
                    this._getCanCelPaymentRequest(response.data[0].wallet_id);
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getTransactionByRequestSender = (wellet_id) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/requests?sender_wallet_id=eq.' + wellet_id + '&order=timestamp.desc';
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataReQuestSender: response.data,
                        // isLoading: false
                    });
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

    _getCanCelPaymentRequest = (walletId) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/requests?receiver_wallet_id=eq.' + walletId + '&request_status=eq.3';
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataCanCelPaymentRequest: response.data,
                        // isLoading: false
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getReceiverWalletId = (walletId) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + API.getReceiverWalletId(walletId) + '&order=timestamp.desc';
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataReceiverWallet: response.data,
                        // isLoading: false
                    });
                    console.log("ahuhu");
                    console.log(dataReceiverWallet);
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getUserIdByWalletId = (walletId) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/wallet?wallet_id=eq.' + walletId;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataUserSender: response.data[0].user_id,
                        // isLoading: false
                    });
                    this._getUserSenderById(response.data[0].user_id);
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }

    };

    _getUserSenderById = (userIdSend) => {

        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/users?user_id=eq.' + userIdSend;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        fullNameUserSend: response.data[0].full_name,
                        // isLoading: false
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getTransactionsSender = (wellet_id) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/transactions?sender_wallet_id=eq.' + wellet_id;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactions: response.data,
                        // isLoading: false
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getTransactionReceiver = (wellet_id) => {
        try {
            //this.setState({isLoading: true});
            const url = API.baseurl + '/transactions?receiver_wallet_id=eq.' + wellet_id;
            const header = {
                'Content-Type': 'application/json',
            };
            axios({method: 'get', url: url, headers: header})
                .then((response) => {
                    this.setState({
                        dataTransactionsReceiver: response.data,
                        // isLoading: false
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    // this.setState({isLoading: false});
                });
        }catch (e) {
            console.log('_getWalletByUserId' + e.error);
        }
    };

    _getTransactionExternal = (walletId) => {
            try {
                //this.setState({isLoading: true});
                const url = API.baseurl + '/external_transactions?wallet_id=eq.' + walletId;
                const header = {
                    'Content-Type': 'application/json',
                };
                axios({method: 'get', url: url, headers: header})
                    .then((response) => {
                        this.setState({
                            dataTransactionsExternal: response.data,
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
    };
     _getTransaction = (walletId, count) =>{
         try {
             //this.setState({isLoading: true});
             const url = 'http://3.124.107.180:3000/transactions?or=(sender_wallet_id.eq.'+ walletId + ',receiver_wallet_id.eq.'+ walletId + ')&limit='+ count + '&order=timestamp.desc';
             const header = {
                 'Content-Type': 'application/json',
             };
             axios({method: 'get', url: url, headers: header})
                 .then((response) => {
                     this.setState({
                         datatrans: response.data,
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
     };
    /**
     * format price to $1.000
     * return price
     * string
     * */
    _handlePrice = (price) => {
        try {
            let initPrice = price.replace(/,/g, '');
            let returnTxt = initPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            return returnTxt;
        }catch (e) {
            console.log('_handlePrice' + e.error);
        }
    };

    /**
     * render view payment request
     * */
    _renderRequest = ({item, index}) =>{
        let base64Icon = 'data:image/png;base64,';
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+ ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':' + ((date.getMinutes() > 9) ?  date.getMinutes() : ('0' + date.getMinutes()) );;

        return(
            <TouchableOpacity style={{ marginTop: height*0.02,flexDirection:'row',height:height*0.1,justifyContent:'space-between',alignItems:'center',marginBottom:5}}
                              onPress={()=>{
                                  this.props.navigation.navigate('PaymentInfo',{dataSchool:item, name: this.state.fullNameUserSend, sendMonyRequest: true, DataUser: DataUser,balance:this.state.balance})
                              }}
            >
                {
                    item.photo === null ?
                        <Image source={require('../../assets/icons/iconPaymentRequest.png')}/>
                        :
                        <Image style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#ffffff',
                            borderRadius: 50/2,
                        }} source={{uri: base64Icon + item.photo}}/>
                }
                <View style={{width:'80%',justifyContent:'space-between',height:'100%'}}>
                    <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                        {date}
                    </Text>
                    <View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontWeight:'bold',fontSize:width*0.039}} numberOfLines={2}>
                            {item.sender_full_name?item.sender_full_name:null}
                            <Text style={{fontFamily:'Roboto',fontWeight:'300'}}>{I18n.t("đã gửi một yêu cầu cho -")} </Text>
                            {item.amount?this._handlePrice(item.amount.toString()):0} VND
                        </Text>
                    </View>
                    {
                        item.message?
                            <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.035}} numberOfLines={1}>
                                "{item.message.trim()}"
                            </Text>
                            :
                            <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.035,fontWeight:'bold',}} numberOfLines={2}>
                            </Text>
                    }

                </View>
            </TouchableOpacity>
        );
    };

     /**
      * render view payment request sender
      * */
     _renderRequestSender = ({item, index}) =>{
         let date = new Date(item.timestamp);
         date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-'+' '+ date.getHours()+ ':' + ((date.getMinutes() > 9) ?  date.getMinutes() : ('0' + date.getMinutes()) );

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
                                 <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                     <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>"{item.message.trim()}"</Text>
                                 </Text>
                                 :
                                 <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                 </Text>
                         }
                     </View>
                 </View>
             </TouchableOpacity>
         );
     };

     /**
      * render view payment request CanCel
      * */
     _renderCanCelPaymentRequest = ({item, index}) =>{
         let date = new Date(item.timestamp);
         date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();

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

    /**Gửi đề nghị thanh toán tới
     * render transaction sender
     * */
    _renderTransaction = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':' + ((date.getMinutes() > 9) ?  date.getMinutes() : ('0' + date.getMinutes()) );

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

    /**
     * render transaction receiver
     * */
    _renderTransactionReceiver = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() + ' ' + date.getHours()+ 'h' + date.getMinutes() + 'p';
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

     _render = ({item,index}) => {
         let dau= '';
         let image = '';
         let mess='';
         let backgroundColor='';
         let NameHistory ='';
             if(item.type === 'topup'){
                 dau='+';
                 image= require('../../assets/icons/iconnap.png');
                  //<Image source={require('../../assets/icons/iconnap.png')}/>
                 mess= I18n.t("Bạn Đã Nạp Tiền Vào Ví");
                 backgroundColor= '#00b141'
             }else
                 if(item.type === 'withdrawal'){
                     dau='-';
                     image= require('../../assets/icons/withdrawal.png');
                     mess= I18n.t("Rút tiền về thẻ đã liên kết");
             }else
             if(item.type === null ){
                 dau='-';
                 image= require('../../assets/icons/icongui.png');
                 if(item.sender_wallet_id === walletID){
                     mess= I18n.t("Chuyển tiền đến") +' ' ;
                     NameHistory = item.receiver_full_name; 
                     dau='-';
                     backgroundColor= '#ffb300'
                 }else if(item.receiver_wallet_id === walletID) {
                     mess= I18n.t("chuyển tiền cho bạn") +' ';
                     dau='+';
                     NameHistory = item.sender_full_name;
                     backgroundColor= '#ffb300'
                 }
             }

         let date = new Date(item.timestamp);
         date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +' '+ '-' + ' '+  ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours()))+ ':' +((date.getMinutes() > 9) ?  date.getMinutes() : ('0' + date.getMinutes()) );
         console.log('logDate', date);
         return (
             <TouchableOpacity style={{ marginVertical:15,height:height*0.07,justifyContent:'space-between',alignItems:'center', }}
                 // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
             >
                 <View style={{
                     flex: 1,
                     flexDirection:'row',
                 }}>
                     <View style={{width:'20%',alignItems:'center'}}>
                         <View style={{  width: 35, height: 35, borderRadius: 35/2, backgroundColor: backgroundColor,justifyContent:'center',alignItems:'center', }}>
                         <Image resizeMode= "contain" source={image}/>
                         </View>
                     </View>
                     <View style={{width:'80%',height:'100%'}}>
                         <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                             <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                 {date}
                             </Text>
                             <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}> {dau} {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                         </View>
                         <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.035,fontWeight:'bold',}}>
                             <Text style={{fontFamily:'Roboto', fontWeight:'300',}}>{mess}</Text>
                             {NameHistory}
                         </Text>
                         {
                             item.message?
                                 <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                     <Text style={{fontFamily:'Roboto', fontWeight:'300'}}>"{item.message.trim()}"</Text>
                                 </Text>
                                 :
                                 <Text style={{fontFamily:'Roboto',color:'#a5a5a5',fontSize:width*0.03,fontWeight:'bold',}} numberOfLines={2}>
                                 </Text>
                         }

                     </View>
                 </View>
             </TouchableOpacity>
         );
     };

    /**
     * render transaction external
     * */
    _renderTransactionExternal = ({item,index}) => {
        let date = new Date(item.timestamp);
        date = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();

        return (
            <TouchableOpacity style={{ marginVertical:15,height:height*0.05,justifyContent:'space-between',alignItems:'center'}}
                // onPress={()=>{this.props.navigation.navigate('RequestConfirmationScreen',{dataSchool:item})}}
            >
                <View style={{
                    flex: 1,
                    flexDirection:'row',
                }}>
                    <View style={{width:'20%',alignItems:'center'}}>
                        <Image source={item.type === 'topup'? require('../../assets/images/deposit.png'):  require('../../assets/icons/withdrawal.png')} style={{width:width*0.1,height:width*0.1}}/>
                    </View>
                    <View style={{width:'80%',height:'100%'}}>
                        <View  style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>
                                {date}
                            </Text>
                            <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.033}}>{item.type === 'topup'? '+':'-'} {item.amount?this._handlePrice(item.amount.toString()):0} VND</Text>
                        </View>
                        <Text style={{fontFamily:'Roboto',color:'#fff',fontSize:width*0.039,fontWeight:'bold',}} numberOfLines={2}>
                            <Text style={{fontFamily:'Roboto', fontWeight:'300'}}> {item.type === 'topup'? I18n.t('Bạn Đã Nạp Tiền Vào Ví'):I18n.t('Bạn Đã Rút Ví Ra Tài Khoản') } </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    TopUp=()=>{
        if (parseInt(this.state.balance) >= 5000000){
            this.setState({ShowAlert: true, Message: I18n.t("khongthenapthemtienkhisoduvi>=5tr")});
        }else {
            this.setState({offset: 10 });
            this.props.navigation.navigate('DuplucationScreen', {commit: 'Nạp tiền', walletId: this.state.walletId, balance: this.state.balance})
            this.setState({isShowPoup:false})
        }

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#000000',  marginTop: Platform.OS === "ios" ? 35 : 0, }}>
                {this.state.ShowAlert ? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
                    :
                <View style={{ flex: 1 }}>
                <View style={{width:width, height:height*0.07,backgroundColor:"#d2a61f", flexDirection:'row',alignItems:'center',justifyContent:'space-between' ,paddingHorizontal:width/12}}>
                    <View>
                        <TouchableOpacity
                            onPress={this._onToMenu}
                        >
                            <Image
                                style={{width: width / 17, height: width / 20}}
                                source={require('../../assets/icons/MenuBlack.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image
                                style={{width: width / 10, height: width / 10}}
                                source={require('../../assets/icons/6Gblack.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this._onToProfile}
                        >
                            <Image
                                style={{width: width / 18, height: width / 18}}
                                source={require('../../assets/icons/Iconperson.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{flex:1}}
                nestedScrollEnabled={true}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                >
                    {/*balance*/}
                    <View style={{marginHorizontal: 20, marginVertical: 12,width:width-40}}>
                        <View style={{
                            height: height*0.211,
                            borderRadius: 10,
                            backgroundColor: '#d2a61f',
                            borderWidth: 1,
                            borderColor: '#d2a61f'
                        }}>
                            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                                <View style={{marginTop: 30, marginLeft: 10}}>

                                    <Text style={{
                                        fontFamily:'Roboto',
                                        color: '#000000',
                                        fontSize: 16,
                                        fontWeight: '700'
                                    }}>{I18n.t("Số dư ví")}</Text>

                                    <Text style={{
                                        fontFamily:'Roboto',
                                        color: '#000000',
                                        fontSize: 24,
                                        fontWeight: '700',
                                        marginTop: 20
                                    }}>{this.state.balance?this._handlePrice(this.state.balance.toString()):0} VND</Text>
                                </View>
                                <Image
                                    style={{width: width*0.2, height: width*0.2, position:'absolute',bottom:'-5%',right:'5%'}}
                                    source={require('../../assets/icons/iconbankur.png')}
                                />
                            </View>
                        </View>
                    </View>

                    {
                        this.state.dataReceiverWallet.length > 0?

                            <View style={{paddingHorizontal:20,marginTop:10, width:width, height: height/3.7 }}>
                                <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:'#d2a61f',paddingBottom:3}}>
                                    <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.039,}}>{I18n.t("Yêu cầu")}</Text>
                                </View>
                                <ScrollView nestedScrollEnabled={true}>
                                <FlatList
                                    data={this.state.dataReceiverWallet}
                                    numColumns={1}
                                    renderItem={this._renderRequest}
                                    keyExtractor={(item, index) => {
                                        return item.toString() + index.toString();
                                    }}
                                    extraData={this.state}
                                />
                                </ScrollView>
                            </View>

                            :null
                    }
                    {
                        this.state.dataReQuestSender.length > 0?
                            <View style={{paddingHorizontal:20,marginTop:10,width:width, height: height/3.5 }} >
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
                            </View>
                            :null
                    }

                    {
                        (this.state.dataTransactions.length > 0) ||  (this.state.dataTransactionsReceiver.length > 0) || (this.state.dataTransactionsExternal.length > 0) || (this.state.dataReQuestSender.length > 0 || (this.state.dataCanCelPaymentRequest.length > 0))?
                            <View style={{marginTop:30,paddingHorizontal:20}}>
                                {/*header history*/}
                                <View style={{flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#d2a61f',paddingBottom:3,marginBottom:10}}>
                                    <Text style={{fontFamily:'Roboto',color:'#d2a61f',fontSize:width*0.039,}}>{I18n.t("Lịch sử giao dịch")}</Text>
                                    <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Fillter',{
                                            walletID:walletID
                                        })}>
                                            <Image
                                                style={{width: width*0.055, height: width*0.03, marginRight: 10}}
                                                source={require('../../assets/icons/filter-icon.png')}
                                            />
                                        </TouchableOpacity>
                                        {/*<TouchableOpacity onPress = {() => alert('this is export csv')}>*/}
                                        {/*    <Image*/}
                                        {/*        style={{width: width*0.05, height: width*0.055}}*/}
                                        {/*        source={require('../../assets/icons/export-icon.png')}*/}
                                        {/*    />*/}
                                        {/*</TouchableOpacity>*/}
                                    </View>
                                </View>


                                {/*{*/}
                                {/*    this.state.dataTransactions.length > 0 ?*/}
                                {/*        <View>*/}
                                {/*            /!*list history*!/*/}
                                {/*            <FlatList*/}
                                {/*                data={this.state.dataTransactions}*/}
                                {/*                numColumns={1}*/}
                                {/*                renderItem={this._renderTransaction}*/}
                                {/*                keyExtractor={(item, index) => {*/}
                                {/*                    return item.toString() + index.toString();*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*        </View>*/}
                                {/*        :null*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    this.state.dataTransactionsReceiver.length > 0 ?*/}
                                {/*        <View>*/}
                                {/*            /!*list history*!/*/}
                                {/*            <FlatList*/}
                                {/*                data={this.state.dataTransactionsReceiver}*/}
                                {/*                numColumns={1}*/}
                                {/*                renderItem={this._renderTransactionReceiver}*/}
                                {/*                keyExtractor={(item, index) => {*/}
                                {/*                    return item.toString() + index.toString();*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*        </View>*/}
                                {/*        :null*/}
                                {/*}*/}
                                {
                                    this.state.datatrans.length > 0 ?
                                        <View>
                                            {/*list history*/}
                                            <FlatList
                                                data={this.state.datatrans}
                                                numColumns={1}
                                                renderItem={this._render}
                                                keyExtractor={(item, index) => {
                                                    return item.toString() + index.toString();
                                                }}
                                            />
                                        </View>
                                        :null
                                }
                                {/*{*/}
                                {/*    this.state.dataTransactionsExternal.length > 0?*/}
                                {/*        <View>*/}
                                {/*            /!*list history*!/*/}
                                {/*            <FlatList*/}
                                {/*                data={this.state.dataTransactionsExternal}*/}
                                {/*                numColumns={1}*/}
                                {/*                renderItem={this._renderTransactionExternal}*/}
                                {/*                keyExtractor={(item, index) => {*/}
                                {/*                    return item.toString() + index.toString();*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*        </View>*/}
                                {/*        :null*/}
                                {/*}*/}


                                {/*{*/}
                                {/*    this.state.dataCanCelPaymentRequest.length > 0?*/}
                                {/*        <View>*/}
                                {/*            /!*list history*!/*/}
                                {/*            <FlatList*/}
                                {/*                data={this.state.dataCanCelPaymentRequest}*/}
                                {/*                numColumns={1}*/}
                                {/*                renderItem={this._renderCanCelPaymentRequest}*/}
                                {/*                keyExtractor={(item, index) => {*/}
                                {/*                    return item.toString() + index.toString();*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*        </View>*/}
                                {/*        :null*/}
                                {/*}*/}
                                <TouchableOpacity
                                    onPress={() =>  {
                                        // this.setState({offset: 20 });
                                        this._getTransaction(walletID, 20);
                                    }}
                                    style={{ alignItems:'center'}}>
                                    <Text style={{ color:'#d2a61f',fontSize:16,}}>{I18n.t("Seemore")}</Text>
                                </TouchableOpacity>
                            </View>


                            :null
                    }
                </ScrollView>
                {this.state.isShowPoup === true?
                    <View style={{
                        flex: 1,
                        width:width,
                        height:height,
                        position:'absolute',
                        zIndex:1000,
                        backgroundColor: 'rgba(6,34,36,0.87)',
                    }}>
                        <View style={{
                            position: 'absolute',
                            bottom: Platform.OS === "ios" ? 60 : 10,
                            right: 10,
                            alignItems:'flex-end',
                            paddingHorizontal: 10,
                        }}>
                            {
                                this.state.dataDebitCardByUserId.length > 0 ?
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginBottom: 10
                                        }}

                                        onPress = {() => {this.TopUp()}
                                        }
                                    >
                                        <Text style={{fontFamily:'Roboto',
                                            color: '#ffffff',
                                            fontSize: 16,
                                            fontWeight: '400',
                                            lineHeight: 50,
                                            marginRight: 8
                                        }}>{I18n.t("Nạp tiền")}</Text>
                                        <View style={{
                                            width: 35,
                                            height: 35,
                                            backgroundColor: '#00b141',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            borderRadius: 35/2
                                        }}>
                                            <Image source={require('../../assets/icons/iconnap.png')}/>
                                        </View>
                                    </TouchableOpacity>
                                    :null
                            }
                            {
                                this.state.dataDebitCardByUserId.length > 0 ?
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 10
                                        }}

                                        onPress = {() => {
                                            this.setState({offset: 10 });
                                            this.props.navigation.navigate('DuplucationScreen', {commit: 'Rút Tiền', walletId: this.state.walletId, balance: this.state.balance})
                                            this.setState({isShowPoup:false})
                                        }
                                        }
                                    >
                                        <Text style={{
                                            fontFamily: 'Roboto',
                                            color: '#ffffff',
                                            fontSize: 16,
                                            fontWeight: '400',
                                            lineHeight: 50,
                                            marginRight: 8
                                        }}>{I18n.t("Rút Tiền")}</Text>
                                        <View style={{
                                            width: 35,
                                            height: 35,
                                            backgroundColor: '#0186fb',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 35 / 2
                                        }}>
                                            <Image source={require('../../assets/icons/iconrut.png')}/>
                                        </View>
                                    </TouchableOpacity>
                                    : null
                            }
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginBottom: 10
                                }}

                                onPress = {() => {
                                    this.setState({offset: 10 });
                                    this.props.navigation.navigate('PhoneBook',
                                        {
                                            commit: 'Chuyển tiền',
                                            UserSendwalletId:this.state.walletId,
                                            DataUser: DataUser,
                                            balance: this.state.balance
                                        }
                                    )
                                    this.setState({isShowPoup:false})
                                }}
                            >
                                    <Text style={{fontFamily:'Roboto',
                                        color: '#ffffff',
                                        fontSize: 16,
                                        fontWeight: '400',
                                        lineHeight: 50,
                                        marginRight: 8
                                    }}>{I18n.t("Chuyển tiền")}</Text>
                                <View style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: '#ffb300',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius: 35/2
                                }}>
                                    <Image source={require('../../assets/icons/icongui.png')}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginBottom: 10
                                }}

                                onPress = {() => {
                                    this.setState({offset: 10 });
                                    this.props.navigation.navigate('PhoneBook',
                                        {
                                            commit: 'Yêu cầu chuyển tiền',
                                            UserSendwalletId:this.state.walletId,
                                            DataUser: DataUser,

                                        }
                                    )
                                    this.setState({isShowPoup:false})
                                }}
                            >
                                    <Text style={{fontFamily:'Roboto',
                                        color: '#ffffff',
                                        fontSize: 16,
                                        fontWeight: '400',
                                        lineHeight: 50,
                                        marginRight: 8
                                    }}>{I18n.t("Yêu cầu chuyển tiền")}</Text>
                                <View style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: '#00b141',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius: 35/2
                                }}>
                                    <Image source={require('../../assets/icons/iconchuyen.png')}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: 47,
                                    height: 47,
                                    backgroundColor: '#d2a61f',
                                    borderRadius: 47/2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom:Platform.OS === "ios" ? 0 : 100,
                                }}
                                onPress = {() => this.setState({
                                    isShowPoup: false,
                                    zIndex: 0
                                })}>
                                <Image source={require('../../assets/icons/iconx.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity
                        style={{
                            width: 47,
                            height: 47,
                            backgroundColor: '#d2a61f',
                            borderRadius: 47/2,
                            position: 'absolute',
                            bottom: 25,
                            right: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: this.state.zIndex?this.state.zIndex:10
                        }}
                        onPress = {() => this.setState({isShowPoup: true})}>
                        <Text style={{fontFamily:'Roboto',
                            color: '#fff',
                            fontSize: 47/2
                        }}>+</Text>
                    </TouchableOpacity>
                }
                {this.state.isLoading ?
                    <ActivityIndicatorView/>
                    :
                    null
                }
                </View>
                }
            </View>
        );
    }
}
export default MainScreen;
