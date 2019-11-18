import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";

const { width, height } = Dimensions.get("screen");
import React, { Component } from "react";
import I18n from "../../language/I18n";
import API from "../../api/APIConstant";
import axios from "axios";
import HeaderOnlyBack from "../Header/HeaderOnlyBack";
import Result from "../Fillter/Result";
import styles from "../Fillter/FilterStyle";
import styles1 from "../Calendar/Calendar.Style";
let walletID;
import { Calendar, LocaleConfig } from "react-native-calendars";
let url = API.baseurl + "/transactions?";
import moment from "moment";
import FailureScreen from "../FailureScreen/index";
const priceRegex = /(\d)(?=(\d{3})+(?!\d))/gi;
LocaleConfig.locales.vi = {
  monthNames: [
    I18n.t("Tháng 1"),
    I18n.t("Tháng 2"),
    I18n.t("Tháng 3"),
    I18n.t("Tháng 4"),
    I18n.t("Tháng 5"),
    I18n.t("Tháng 6"),
    I18n.t("Tháng 7"),
    I18n.t("Tháng 8"),
    I18n.t("Tháng 9"),
    I18n.t("Tháng 10"),
    I18n.t("Tháng 11"),
    I18n.t("Tháng 12")
  ],
  monthNamesShort: [
    I18n.t("Tháng 1"),
    I18n.t("Tháng 2"),
    I18n.t("Tháng 3"),
    I18n.t("Tháng 4"),
    I18n.t("Tháng 5"),
    I18n.t("Tháng 6"),
    I18n.t("Tháng 7"),
    I18n.t("Tháng 8"),
    I18n.t("Tháng 9"),
    I18n.t("Tháng 10"),
    I18n.t("Tháng 11"),
    I18n.t("Tháng 12")
  ],
  dayNames: [
    I18n.t("CN"),
    I18n.t("T2"),
    I18n.t("T3"),
    I18n.t("T4"),
    I18n.t("T5"),
    I18n.t("T6"),
    I18n.t("T7")
  ],
  dayNamesShort: [
    I18n.t("CN"),
    I18n.t("T2"),
    I18n.t("T3"),
    I18n.t("T4"),
    I18n.t("T5"),
    I18n.t("T6"),
    I18n.t("T7")
  ],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = "vi";
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
      DataChoice: [
        { id: 1, title: I18n.t("Nạp tiền"), Change: true, total: 1 },
        { id: 2, title: I18n.t("Chuyển tiền"), Change: true, total: 1 },
        { id: 3, title: I18n.t("Nhận tiền"), Change: true, total: 1 },
        { id: 4, title: I18n.t("Rút tiền"), Change: true, total: 1 },
        {
          id: 5,
          title: I18n.t("Yêu cầu chuyển tiền"),
          Change: false,
          total: 1
        },
        { id: 6, title: I18n.t("Hủy yêu cầu"), Change: false, total: 1 }
      ],
      CheckWeek: true,
      CheckMonth: false,
      CheckOther: false,
      isShowDate: false,
      selectedStartDate: null,
      fromMoney: "",
      toMoney: "",
      topup: null,
      send: null,
      receive: null,
      withdraw: null,
      request: null,
      cancel: null,
      count: 0,
      money: null,
      endDay: "",
      startDay: "",
      markedDates: {},
      dateSelectFrom: I18n.t("Từ ngày"),
      dateSelectTo: I18n.t("Đến ngày"),
      isCalendaTo: false,
      corlorTextfrom: "#d2a61fff",
      corlorTextTo: "#a5a5a5ff",
      ShowAlert: false,
      Message: "",
      search: ""
    };
  }

  componentDidMount(): void {
    walletID = this.props.navigation.getParam("walletID");
  }
  _ClosePopup = close => {
    this.setState({ ShowAlert: close });
  };
  _onDayPress = day => {
    let date = {};
    date[`${day.dateString}`] = { selected: true, selectedColor: "#d2a61fff" };
    if (this.state.isCalendaTo) {
      if (day.dateString < this.state.dateSelectFrom) {
        return this.setState({
          ShowAlert: true,
          Message: I18n.t("Vui lòng chọn lại ngày")
        });
      }
      this.setState({
        markedDates: date,
        dateSelectTo: day.dateString,
        corlorTextTo: "#a5a5a5ff"
      });
    } else {
      if (day.dateString > this.state.dateSelectTo) {
        return this.setState({
          ShowAlert: true,
          Message: I18n.t("Vui lòng chọn lại ngày")
        });
      }
      this.setState({
        markedDates: date,
        dateSelectFrom: day.dateString,
        corlorTextfrom: "#a5a5a5ff"
      });
    }
  };
  _onCheckDateFrom = () => {
    this.setState({
      isCalendaTo: false,
      markedDates: {},
      corlorTextfrom: "#d2a61fff",
      corlorTextTo: "#a5a5a5ff"
    });
  };
  _onCheckDateTo = () => {
    this.setState({
      isCalendaTo: true,
      markedDates: {},
      corlorTextTo: "#d2a61fff",
      corlorTextfrom: "#a5a5a5ff"
    });
  };
  onDateChange = date => {
    this.setState({
      selectedStartDate: date
    });
  };
  _checkIsShowDate = () => {
    this.setState({
      CheckOther: !this.state.CheckOther,
      CheckWeek: false,
      CheckMonth: false
    });
  };
  _renderRequest = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          paddingHorizontal: 20,
          marginVertical: 20
        }}
        onPress={() => {
          if (
            item.id === 1 ||
            item.id === 2 ||
            item.id === 3 ||
            item.id === 4
          ) {
            this.setState({
              ...this.state,
              DataChoice: this.state.DataChoice.map(e => {
                if (e.id !== item.id) {
                  {
                    if (e.id === 6 || e.id === 5) {
                      return { ...e, Change: false };
                    } else {
                      return e;
                    }
                  }
                }
                return { ...e, Change: !e.Change };
              })
            });
          }
          if (item.id === 5 || item.id === 6) {
            this.setState({
              ...this.state,
              DataChoice: this.state.DataChoice.map(e => {
                if (e.id !== item.id) {
                  {
                    if (e.id === 1 || e.id === 2 || e.id === 3 || e.id === 4) {
                      return { ...e, Change: false };
                    } else {
                      return e;
                    }
                  }
                }
                return { ...e, Change: !e.Change };
              })
            });
          }
        }}
      >
        {item.Change ? (
          <Image
            style={styles.Image}
            source={require("../../assets/icons/checked.png")}
          />
        ) : (
          <Image
            style={styles.Image}
            source={require("../../assets/icons/Uncheck.png")}
          />
        )}

        <Text style={styles.TextFlatlist}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  render1() {
    const from =
      this.state.dateSelectFrom === I18n.t("Từ ngày")
        ? I18n.t("Từ ngày")
        : moment(this.state.dateSelectFrom).format("DD-MM-YYYY");
    const to =
      this.state.dateSelectTo === I18n.t("Đến ngày")
        ? I18n.t("Đến ngày")
        : moment(this.state.dateSelectTo).format("DD-MM-YYYY");
    return (
      <View style={styles1.container}>
        <View style={styles1.wrapBody1}>
          <View style={styles1.wrapBody}>
            <TouchableOpacity onPress={this._onCheckDateFrom}>
              <Text
                style={[
                  styles1.styleText,
                  { color: this.state.corlorTextfrom }
                ]}
              >
                {from}
              </Text>
            </TouchableOpacity>
            <View style={styles1.wrapView} />
            <TouchableOpacity onPress={this._onCheckDateTo}>
              <Text
                style={[styles1.styleText, { color: this.state.corlorTextTo }]}
              >
                {to}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Calendar
            markedDates={this.state.markedDates}
            theme={{
              arrowColor: "#d2a61fff",
              todayTextColor: "#d2a61fff",
              selectedDayTextColor: "#a5a5a5ff",
              monthTextColor: "#d2a61fff",
              textMonthFontSize: 14,
              textDayFontSize: 15,
              textDayHeaderFontSize: 18
            }}
            onDayPress={this._onDayPress}
            style={styles1.styleCalendar}
          />
        </View>
      </View>
    );
  }
  _formatThousand(numStr) {
    let returnTxt;
    if (numStr.length > 3) {
      returnTxt = numStr.replace(priceRegex, "$1.");
    } else {
      returnTxt = numStr;
    }
    return returnTxt;
  }
  _fromMoney = text => {
    let initPrice = text.replace(/\D|^0+/gi, ""),
      formatedPriceFrom = this._formatThousand(initPrice);
    this.setState({ fromMoney: formatedPriceFrom });
  };
  _toMoney = text => {
    let initPrice = text.replace(/\D|^0+/gi, ""),
      formatedPriceTo = this._formatThousand(initPrice);
    this.setState({ toMoney: formatedPriceTo });
  };
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";

    return (
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === "ios" ? 35 : 0,
          backgroundColor: "#000000"
        }}
      >
        <HeaderOnlyBack
          navigation={this.props.navigation}
          title={"locvatimkiem"}
        />
        {this.state.ShowAlert ? (
          <FailureScreen
            message={this.state.Message}
            _ClosePopup={this._ClosePopup}
          />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              <View
                style={{
                  flex: this.state.CheckOther ? 0.12 : 0.5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: height / 40
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      CheckWeek: !this.state.CheckWeek,
                      CheckMonth: false,
                      CheckOther: false
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.TextLastWeek,
                      {
                        color: this.state.CheckWeek ? "#fff" : "#d2a61f",
                        backgroundColor: this.state.CheckWeek ? "#d2a61f" : null
                      }
                    ]}
                  >
                    {I18n.t("Tuần trước")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      CheckMonth: !this.state.CheckMonth,
                      CheckWeek: false,
                      CheckOther: false
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.TextLastWeek,
                      {
                        color: this.state.CheckMonth ? "#fff" : "#d2a61f",
                        backgroundColor: this.state.CheckMonth
                          ? "#d2a61f"
                          : null
                      }
                    ]}
                  >
                    {I18n.t("Tháng trước")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._checkIsShowDate()}>
                  <Text
                    style={[
                      styles.TextLastWeek,
                      {
                        color: this.state.CheckOther ? "#fff" : "#d2a61f",
                        backgroundColor: this.state.CheckOther
                          ? "#d2a61f"
                          : null
                      }
                    ]}
                  >
                    {I18n.t("Khác")}
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.CheckOther ? (
                this.render1()
              ) : (
                <View style={{ flex: 4.4, marginTop: height / 40 }}>
                  <View style={styles.ViewMoney}>
                    <Text style={styles.TextGold}>{I18n.t("Từ")}</Text>
                    <View style={styles.ViewVND}>
                      <TextInput
                        onChangeText={this._fromMoney}
                        value={this.state.fromMoney}
                        style={styles.TextInputVND}
                        keyboardType="numeric"
                        placeholder="VND"
                        placeholderTextColor="#a5a5a5"
                      />
                    </View>
                    <Text style={styles.TextGold}>{I18n.t("Đến")}</Text>
                    <View style={styles.ViewVND}>
                      <TextInput
                        onChangeText={this._toMoney}
                        value={this.state.toMoney}
                        style={styles.TextInputVND}
                        keyboardType="numeric"
                        placeholder="VND"
                        placeholderTextColor="#a5a5a5"
                      />
                    </View>
                  </View>
                  <View style={{ flex: 0.4, flexDirection: "row" }}>
                    <TextInput
                      style={styles.TextInputSearch}
                      placeholder={I18n.t("Tên hoặc số điện thoại")}
                      placeholderTextColor="#a5a5a5"
                      onChangeText={text => {
                        this.setState({ search: text });
                      }}
                    />
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        this.props.navigation.navigate("Contact");
                      }}
                    >
                      <Image
                        style={{
                          width: width / 19,
                          height: width / 15,
                          right: 0
                        }}
                        source={require("../../assets/icons/Contact.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 3.5 }}>
                    <View>
                      <Text style={styles.TextGold}>
                        {I18n.t("Hình thức giao dịch")}
                      </Text>
                      <FlatList
                        data={this.state.DataChoice}
                        numColumns={2}
                        renderItem={this._renderRequest}
                        keyExtractor={(item, index) => {
                          return item.toString() + index.toString();
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.ButtonResult}
              onPress={() => {
                const { toMoney, fromMoney } = this.state;
                let fomatmoneyFrom = "";
                fromMoney.split(".").forEach(element => {
                  fomatmoneyFrom = fomatmoneyFrom + element;
                });
                let formatMoneyTo = "";
                toMoney.split(".").forEach(element => {
                  formatMoneyTo = formatMoneyTo + element;
                });
                let chose = this.state.DataChoice.filter(item => {
                  return item.Change === true;
                });
                let total = chose.reduce((weight, item, index, animals) => {
                  return (weight += item.total);
                }, 0);
                this.props.navigation.navigate("Result", {
                  DataChoice: this.state.DataChoice,
                  total: total,
                  money: this.state.money,
                  fromMoney: fomatmoneyFrom,
                  moneyto: formatMoneyTo,
                  walletID: walletID,
                  dateSelectFrom: this.state.dateSelectFrom,
                  dateSelectTo: moment(this.state.dateSelectTo)
                    .add(1, "days")
                    .format("YYYY-MM-DD"),
                  CheckWeek: this.state.CheckWeek,
                  CheckMonth: this.state.CheckMonth,
                  search: this.state.search
                });
                this.setState({ dateSelectFrom: I18n.t("Từ ngày") });
                this.setState({ dateSelectTo: I18n.t("Đến ngày") });
                this.setState({ fromMoney: "" });
                this.setState({ toMoney: "" });
              }}
            >
              <Text style={styles.TextResult}> Inquiry </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default index;
