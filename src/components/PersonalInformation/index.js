import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import HeaderOnlyBack from '../Header/HeaderOnlyBack';
import styles from '../PersonalInformation/PersonalInfoStyles';
import I18n from '../../language/I18n';
import associateStyle from '../AssociateSuccess/AssociateSuccessStyles';
import btnStyle from '../Button/OnlyButton';
import commonStyle from '../../Style/CommonStyle';
import { TextInputMask } from 'react-native-masked-text';
import FailureScreen from "../FailureScreen/index";
const { width, height } = Dimensions.get('screen');

class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      birthday: "",
      isRead: false,
      isMale: false,
      fullName: "",
      code: "",
      ShowAlert: false,
      Message:''
    };
  }
  componentDidMount() {
    let userId = this.props.navigation.getParam("data");
  }
  _ClosePopup = (close)=>{
    this.setState({ShowAlert:close})
};
  _checkReadRequire = () => {
    this.setState({
      isRead: !this.state.isRead
    });
  };
  _onChangeName = text => {
    if (text === " ") {
      this.setState({ text: "" })
    } else {
      this.setState({ fullName: text });
    }
  };
  _onChangeCode = text => {
    if (text == " ") {
      this.setState({ code: "" })
    } else {
      this.setState({ code: text });
    }
  };
  _onChangeBirthDay = text => {
    this.setState({ birthday: text });
  };
  _onSubmit = () => {
    const { fullName, code, birthday, isRead } = this.state;
    if (fullName == '' || code == '' || birthday == '') {
      this.setState({
        ShowAlert: true,
        Message: I18n.t("Vui lòng nhập đủ thông tin")
      });
    } else if (!isRead) {
      this.setState({
        ShowAlert: true,
        Message: I18n.t("Bạn phải đồng ý với điều khoản và chính sách của 6G")
      });
    } else {
      let userId = this.props.navigation.getParam("data");
      const params = {
        userId: userId,
        gender: this.state.isMale ? 'Male' : 'Female',
        birthday: this.state.birthday
      };
      this.props.navigation.navigate("Associate", { data: params });
    }
  };
  render() {
    return (
      <ScrollView style={commonStyle.container}>
        {this.state.ShowAlert?<FailureScreen message={this.state.Message} _ClosePopup={this._ClosePopup}/>
        :
        <View>
        <HeaderOnlyBack
          personInfo={true}
          title="Thông tin cá nhân"
          navigation={this.props.navigation}
        />
        <View style={styles.ContainerTop}>
          <View style={[commonStyle.borderBot, styles.viewFirst]}>
            <Text style={[commonStyle.lineHeight, commonStyle.label]}>
              {I18n.t('Nhập chính xác')}
            </Text>
          </View>

          <View style={styles.ViewBorder}>
            <Text style={commonStyle.label}>{I18n.t('Họ tên đầy đủ')}</Text>
            <TextInput
              value={this.state.fullName}
              autoCapitalize="characters"
              style={{
                textTransform: 'uppercase',
                color: 'white',
                fontSize: 16,
                marginTop: 8,
              }}
              autoFocus={true}
              onChangeText={this._onChangeName}
              onSubmitEditing={event => {
                this.refs.input_cart.focus();
              }}
            />
          </View>
          <View style={[commonStyle.flexRow, commonStyle.borderBot]}>
            <TouchableOpacity style={styles.viewIDNumber}>
              <Text
                style={[commonStyle.lineHei, styles.marginR, commonStyle.label]}
              >
                {I18n.t('Mã số')}
              </Text>
              <Image source={require('../../assets/images/arrow-down.png')} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingVertical: 10,
                paddingLeft: 20,
                width: "100%"
              }}
            >
              <Text style={commonStyle.label}>{I18n.t('Mã số')}</Text>
              <View style={{ height: width / 5, width: '100%' }}>
                <TextInput
                  style={{
                    textTransform: 'uppercase',
                    color: 'white',
                    fontSize: 16,
                    marginTop: 5,
                  }}
                  value={this.state.code}
                  keyboardType="numeric"
                  selectionColor="#d2a61f"
                  ref="input_cart"
                  onSubmitEditing={event => {
                    this.input_birthday.getElement().focus() ;
                  }}
                  onChangeText={this._onChangeCode}
                />
              </View>
            </View>
          </View>

          <View style={styles.ViewBorder}>
            <Text style={commonStyle.label}>{I18n.t('Ngày sinh')}</Text>
            <TextInputMask
              onChangeText={this._onChangeBirthDay}
              value={this.state.birthday}
              style={{ color: 'white', marginTop: 8, fontSize: width * 0.039 }}
              selectionColor="#d2a61f"
              ref={ref => (this.input_birthday = ref)}
              keyboardType="numeric"
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              height: height * 0.08,
            }}
          >
            <Text style={{ color: '#fff', fontSize: width * 0.039 }}>
              {I18n.t('Giới tính')}
            </Text>
            <View style={styles.ViewReadRequire}>
              <TouchableOpacity
                onPress={() => this.setState({ isMale: true })}
                style={{ flexDirection: 'row', marginRight: 25 }}
              >
                {this.state.isMale ? (
                  <Image
                    source={require('../../assets/icons/CircleAccept.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/CircleBlank.png')}
                  />
                )}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: width * 0.039,
                    marginLeft: 7,
                  }}
                >
                  {I18n.t('Nam')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ isMale: false })}
                style={{ flexDirection: 'row' }}
              >
                {!this.state.isMale ? (
                  <Image
                    source={require('../../assets/icons/CircleAccept.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/CircleBlank.png')}
                  />
                )}
                <Text
                  style={{
                    color: '#fff',
                    fontSize: width * 0.039,
                    marginLeft: 7,
                  }}
                >
                  {I18n.t('Nữ')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={this._checkReadRequire} style={styles.ViewReadRequire}>
            <TouchableOpacity
              style={{
                width: 16,
                height: 16,
                marginTop: 3,
                borderWidth: this.state.isRead ? 0 : 1,
                borderColor: 'white',
                borderRadius: 2,
              }}
              onPress={this._checkReadRequire}
            >
              {this.state.isRead ? (
                <Image
                  source={require('../../assets/icons/SquareAccept.png')}
                />
              ) : null}
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                width: '100%',
                fontSize: width * 0.039,
                marginLeft: 10,
              }}
            >
              {I18n.t('Tôi đã đọc')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={associateStyle.viewBorder}>
          <View style={btnStyle.viewButtonlogin}>
            <TouchableOpacity
              style={btnStyle.touchopa1}
              onPress={this._onSubmit}
            >
              <View style={btnStyle.loginText}>
                <Text style={btnStyle.TextLogin}>{I18n.t('Tiếp theo')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        }
      </ScrollView>
    );
  }
}
export default index;
