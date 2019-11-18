import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { PureComponent } from 'react';
import styles from './WellcomeMemBer.Style';
import styles1 from '../Button/OnlyButton';
import I18n from "../../language/I18n";
import API from '../../api/APIConstant';
import axios from 'axios';
let Number;
let pass;
let getuser=[];
let iduser;
class index extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };
  state = {
    datauser : {}
  };
  componentWillMount(): void {
    Number = this.props.navigation.getParam("phoneNumber");
    pass =  this.props.navigation.getParam("pass");
      const url = API.baseurl+ API.getUserbyPhone(Number);
      const header = {
          'Content-Type': 'application/json',
      };
      axios({method: 'get', url: url, headers: header})
          .then((response) => {
              console.log(response);
              this.state.datauser = response.data[0];
              iduser = this.state.datauser.user_id;
          }).catch((error) => {
      });
  }

  _onProfile = () => {
    alert("...");
  };
  _onSubmit = () => {
      this.props.navigation.navigate('LoginScreen',
          {
              DataUser:this.state.datauser,
              idUser : this.state.datauser.user_id
          }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.styleHeader}>
          <TouchableOpacity style={styles.iconMember}>

          </TouchableOpacity>
        </View>
        <View style={styles.wrapImageHeader}>
          <View style={styles.image1}>
            <Image
              style={styles.styleImage}
              source={require("../../assets/images/imageWellCome2-xhdpi.png")}
            />
          </View>
          <View style={styles.styleImage1}>
            <Image source={require('../../assets/images/welllcommember.png')} />
          </View>
        </View>
        <View style={styles.wrapTotalText}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>
              {I18n.t("Xin chào, thành viên mới")}
            </Text>
          </View>
        </View>
        <View style={styles.wrapTotalText1}>
          <View style={styles.wrapText1}>
            <Text style={styles.text1}>
              {I18n.t("Tài khoản của bạn đã được tạo thành công")}.
            </Text>
          </View>
        </View>
        <View style={styles1.viewButtonlogin}>
          <TouchableOpacity
            style={styles1.touchopa1}
            onPress={this._onSubmit}
          >
            <Text style={styles1.TextLogin}>{I18n.t("Tiếp Tục")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default index;
