import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import styles from "./Duplication.styles";
import styles1 from '../Button/ButtonColor';
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import I18n from '../../language/I18n';
import ActivityIndicatorView from '../LoadingScreen/ActivityIndicatorView'
import API from '../../api/APIConstant';
import axios from 'axios';
import FailureScreen from '../FailureScreen/index';
let check = '';
let title = '';
let walletId;
let balance;
const priceRegex = /(\d)(?=(\d{3})+(?!\d))/gi;
class DuplucationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    };
  };
  state = {
    money: '' ,
    note:'',
    ShowAlert:false,
    Message:'',
      isLoading:false
  };
  _ClosePopup = (close)=>{
    this.setState({ShowAlert:close})
  };
  _onSubmit = () => {
      this.setState({isLoading:true})
    const { money } = this.state;
        let fomatmoney = ''
        money.split('.').forEach(element => {
            fomatmoney = fomatmoney + element
        });
    if ( money === '') {
      this.setState({ShowAlert:true,Message:I18n.t('Vui lòng nhập số tiền'),isLoading:false});
    } else {
        this.props.navigation.navigate("MainOTPsend",
            {
              option: check,
              note : this.state.note,
              money: fomatmoney,
              walletId : walletId
            }
            );
        this.setState({isLoading:false})
    }
  };
  componentWillMount(): void {
    check = this.props.navigation.getParam("commit");
    title = this.props.navigation.getParam("title","Top up");
    walletId = this.props.navigation.getParam("walletId");
    balance = this.props.navigation.getParam("balance");
  }
  _onChangeNote = text => {
    if (text == ' ') {
      this.setState({ note: "" });
    } else {
      this.setState({ note: text });
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

  _onChangemoney = (text) => {
    let initPrice = text.replace(/\D|^0+/gi, '');
    let formatedPrice = this._formatThousand(initPrice);
      this.setState({ money: initPrice });
      if(check == 'Rút Tiền'){
          if (text == ' ' || text == 0 || text== '-'|| text=='.') {
              this.setState({ money: formatedPrice });
          } else {
              if(parseInt(initPrice)  > balance){
                  this.setState({ShowAlert:true,Message:I18n.t('Không được rút quá số dư của ví'),isLoading:false});
                  this.setState({ money: '' });
              }else{
                  this.setState({ money: formatedPrice });
              }

          }
      } else if(check == 'Nạp tiền'){

          if (text == ' ' || text == 0 || text== '-'|| text=='.') {
              this.setState({ money: formatedPrice });
          } else {
              if( parseInt(initPrice) + balance > 5000000){
                  this.setState({ShowAlert:true,Message:I18n.t('soduvikhongduocvuotqua5000000'),isLoading:false});
                  this.setState({ money: '' });
              }else{
                  this.setState({ money: formatedPrice });
              }

          }
      }

  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderOnlyBack navigation={this.props.navigation} title={check}/>
        {this.state.ShowAlert? <FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
        :
          <ScrollView style={styles.viewScroll}>
              <View style={styles.container}>
              <View style={styles.view1}>
                <View style={styles.view2}>
                  <Image source={require('../../assets/images/Group.png')} />
                </View>
                <View style={styles.view3}>
                  <TextInput
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{this._onChangemoney(text)}}
                    style={styles.textmonney}
                    value={this.state.money}
                  />
                </View>
                <View style={styles.view4}>
                  <Text style={[styles.text1,{ fontWeight: 'bold',}]}>VND</Text>
                </View>
              </View>
              <View style={styles.viewnote}>
                <TextInput
                  onChangeText={this._onChangeNote}
                  style={styles.text2}
                  placeholder={I18n.t("Ghi chú")}
                  placeholderTextColor="#727272"
                  />
                </View>
                <View style={styles.view5}>
                  <View style={styles.view6}>
                    <Text style={styles.text3}>{I18n.t('Dịch vụ')}</Text>
                    <Text style={styles.text3}>{I18n.t('Phí Giao Dịch')} </Text>
                  </View>
                  <View style={[styles.view6,{alignItems:'flex-end'} ]}>
                    <Text style={styles.text4}>{I18n.t(check)}</Text>
                    <Text style={styles.text4}>{I18n.t('Miễn Phí')}</Text>
                  </View>
                </View>
                <View style={styles.view21}>
                  <View style={styles.view22}>
                    <View style={styles.view7}>
                      <Image source={require('../../assets/images/ic_check.png')} />
                    </View>
                    <View style={styles.view23}>
                      <Image source={require('../../assets/images/Logo-MB.png')} />
                    </View>
                    <View style={styles.view8}>
                      <View style={styles.view9}>
                        <Text style={styles.text5}>MBBank 031********215</Text>
                      </View>
                      <View style={styles.viewbotton}>
                        <Text style={styles.text6}>
                          {I18n.t('sodu50k')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.view10}>
                    <View style={styles.view11}>
                      <Image source={require('../../assets/images/card.png')} />
                    </View>
                    <View style={styles.view12}>
                      <View style={styles.view13}>
                        <Text style={styles.text5}>{I18n.t('Thêm Nguồn Tiền')}</Text>
                      </View>
                      <View style={styles.view14}>
                        <Image
                            source={require("../../assets/images/ic_chevron_right.png")}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles1.viewButton}>
                <View style={styles1.viewButtonsmall}>
                  <TouchableOpacity
                      onPress = {() => this.props.navigation.navigate('MainScreen')}
                      style={styles1.ViewTouch}>
                    <View style={styles1.viewTouchsmall}>
                      <Text style={styles1.text6}>{I18n.t('Huỷ')}</Text>
                    </View>
                  </TouchableOpacity>


                  <TouchableOpacity
                      onPress = {this._onSubmit}
                      style={styles1.viewButton2}>
                    <View style={styles1.viewTouchsmall}>
                      <Text style={styles1.text6}>{I18n.t('Xác Nhận')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
export default DuplucationScreen;
