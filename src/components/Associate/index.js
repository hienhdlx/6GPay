import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
  ImageBackground
} from "react-native";
import HeaderOnlyBack from "../Header/HeaderOnlyBack";
import styles from "../Associate/AssociatedStyle";
import associateStyle from "../AssociateSuccess/AssociateSuccessStyles";
import I18n from "../../language/I18n";
import btnStyle from "../Button/OnlyButton";
import commonStyle from "../../Style/CommonStyle";
const { width, height } = Dimensions.get("screen");
const dotImage = require("../../assets/icons/ic_dot.png");
import FailureScreen from "../FailureScreen/index";
import { TextInputMask } from "react-native-masked-text";
import API from "../../api/APIConstant";
import axios from "axios";
class index extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      card_number: "",
      activation_date: "",
      card_holder: "",
      ShowAlert: false,
      Message: "",
      idcredit: "XXXX-XXXX-XXXX-XXXX",
      Visible: false
    };
  }
  _ClosePopup = close => {
    this.setState({ ShowAlert: close });
  };
  componentDidMount() {
    let dataPersona = this.props.navigation.getParam("data");
    console.log("dataPersona", dataPersona);
  }
  _onChangeCard = text => {
    this.setState({ card_number: text });
    this.setState({ idcredit: text });
  };
  _onChangeDate = text => {
    this.setState({ activation_date: text });
  };
  _checkDate() {
    var comp = this.state.activation_date.split("/");
    var d = parseInt(comp[0], 10);
    var m = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    if (d > 31 || d === 0) return true;
    if (m > 12 || d === 0) return true;
    return false;
  }
  _onChangFullName = text => {
    this.setState({ card_holder: this.removeAccents(text) });
  };
  removeAccents(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }
  _onSubmit = () => {
    if (this._checkDate())
      return this.setState({
        ShowAlert: true,
        Message: I18n.t("Định dạng ngày tháng chưa đúng")
      });
    let dataPersona = this.props.navigation.getParam("data");
    console.log("dataPersona", dataPersona);
    const { card_number, activation_date, card_holder } = this.state;
    if (card_number === "" || activation_date === "" || card_holder === "") {
      this.setState({
        ShowAlert: true,
        Message: I18n.t("Vui lòng nhập đủ thông tin")
      });
    } else {
      this.setState({ Visible: true });
      const header = {
        "Content-Type": "application/json"
      };

      const sex = dataPersona.gender;
      const birthday = dataPersona.birthday;
      const fomatBirthday = birthday
        .split("/")
        .reverse()
        .join("/");
      const userId = dataPersona.userId.userId;
      const url = API.baseurl + API.debitcard(userId);
      const card_number = this.state.card_number;
      const full_name = this.state.card_holder;
      const data = {
        bank_id: 1,
        id_number: "187719888",
        card_number: card_number,
        full_name: full_name,
        start_date: "2019-10-20",
        expire_date: "2019-10-20",
        birthdate: fomatBirthday,
        sex: sex,
        user_id: userId,
        timestamp: "2019-10-20"
      };
      console.log("dataPost", data);
      axios({ method: "post", url: url, headers: header, data: data })
        .then(response => {
          console.log(response);
          this.props.navigation.navigate("AssociateSuccess");
        })
        .catch(error => {
          console.log("error", error);
          this.setState({
            ShowAlert: true,
            Message: I18n.t("Thêm ngân hàng không thành công")
          });
        });
    }
  };

  render() {
    return (
      <ScrollView style={commonStyle.container}>
        {this.state.ShowAlert ? (
          <FailureScreen
            message={this.state.Message}
            _ClosePopup={this._ClosePopup}
          />
        ) : (
          <View>
            <HeaderOnlyBack
              personInfo={true}
              title={"Liên kết"}
              navigation={this.props.navigation}
            />
            <View
              style={[
                associateStyle.borderHeader,
                associateStyle.borderHeaderContentStart
              ]}
            >
              <View style={{ padding: 25, paddingTop: 15 }}>
                <ImageBackground
                  source={require("../../assets/images/5-layers-.png")}
                  style={{
                    height: 0.25 * height,
                    borderRadius: 5,
                    backgroundColor: "blue",
                    marginBottom: 20
                  }}
                >
                  {this.state.card_number ? (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "25%",
                        fontSize: 24,
                        marginLeft: "8%"
                      }}
                    >
                      {this.state.card_number}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "25%",
                        fontSize: 24,
                        marginLeft: "8%"
                      }}
                    >
                      XXXX XXXX XXXX XXXX
                    </Text>
                  )}
                  {this.state.activation_date ? (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "1%",
                        fontSize: 16,
                        marginLeft: "8%"
                      }}
                    >
                      {this.state.activation_date}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "1%",
                        fontSize: 16,
                        marginLeft: "8%"
                      }}
                    >
                      MM/YY
                    </Text>
                  )}
                  {this.state.card_holder ? (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "1%",
                        fontSize: 16,
                        marginLeft: "8%",
                        textTransform: "uppercase"
                      }}
                    >
                      {this.state.card_holder}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        marginTop: "1%",
                        fontSize: 16,
                        marginLeft: "8%"
                      }}
                    />
                  )}
                </ImageBackground>
                <View style={styles.ViewBorder}>
                  <TextInputMask
                    type={"credit-card"}
                    maxLength={19}
                    onChangeText={this._onChangeCard}
                    value={this.state.card_number}
                    style={commonStyle.text}
                    placeholder={I18n.t("Nhập số thẻ")}
                    placeholderTextColor="#A5A5A5"
                    keyboardType="numeric"
                    onSubmitEditing={event => {
                      this.input_date.getElement().focus();
                    }}
                  />
                </View>
                <View style={styles.ViewBorder}>
                  <TextInputMask
                    type={"datetime"}
                    options={{ format: "DD/MM" }}
                    onChangeText={this._onChangeDate}
                    value={this.state.activation_date}
                    style={commonStyle.text}
                    placeholder={I18n.t("Ngày kích hoạt (tháng / năm)")}
                    placeholderTextColor="#A5A5A5"
                    keyboardType="numeric"
                    ref={ref => (this.input_date = ref)}
                    onSubmitEditing={event => {
                      this.refs.input_name.focus();
                    }}
                  />
                </View>
                <View style={styles.ViewBorder}>
                  <TextInput
                    onChangeText={this._onChangFullName}
                    value={this.state.card_holder}
                    style={
                      ([commonStyle.text],
                      { textTransform: "uppercase", color: "white" })
                    }
                    placeholder={I18n.t("Chủ thẻ (không có dấu)")}
                    placeholderTextColor="#A5A5A5"
                    autoCapitalize="characters"
                    ref="input_name"
                    keyboardType="web-search"
                  />
                </View>

                <View>
                  <Text style={styles.textCondition}>
                    {I18n.t("Điều kiện liên kết")}
                  </Text>
                  <View style={styles.conditionsItem}>
                    <Image style={styles.dotItem} source={dotImage} />
                    <Text style={commonStyle.label}>
                      {I18n.t(
                        "Dịch vụ thanh toán trực tuyến được kích hoạt trên MB Bank"
                      )}
                    </Text>
                  </View>
                  <View style={styles.conditionsItem}>
                    <Image style={styles.dotItem} source={dotImage} />
                    <Text style={commonStyle.label}>
                      {I18n.t(
                        "Số điện thoại 0987987670 được đăng ký với MB Bank"
                      )}
                    </Text>
                  </View>
                  <View style={styles.conditionsItem}>
                    <Image style={styles.dotItem} source={dotImage} />
                    <Text style={commonStyle.label}>
                      {I18n.t("Số dư của thẻ lớn hơn 50000 đồng")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: width,
                height: height * 0.2,
                marginTop: 30
              }}
            >
              <View style={btnStyle.viewButtonlogin}>
                <TouchableOpacity
                  style={btnStyle.touchopa1}
                  onPress={this._onSubmit}
                  // disabled={this.state.Visible}
                >
                  <View style={btnStyle.loginText}>
                    <Text style={btnStyle.TextLogin}>
                      {I18n.t("Tiếp theo")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default index;
