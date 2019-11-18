import { View, Text, TouchableOpacity } from 'react-native';
import React, { PureComponent } from 'react';
import styles from "./Calendar.Style";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import I18n from '../../language/I18n';
import moment from "moment";
LocaleConfig.locales.vi = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthNamesShort: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  dayNames: ["S", "M", "T", "W", "T", "F", "S"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "vi";
class index extends PureComponent {
  state = {
    markedDates: {},
    dateSelectFrom: I18n.t("Từ ngày"),
    dateSelectTo: I18n.t("Đến ngày"),
    isCalendaTo: false,
    corlorTextfrom: "#d2a61fff",
    corlorTextTo: "#a5a5a5ff"
  };
  componentDidMount() {
    const today = moment().format("YYYY-MM-DD");
    // this._onDayPress({ dateString: today })
  }
  _onDayPress = day => {
    let date = {};
    date[`${day.dateString}`] = { selected: true, selectedColor: "#d2a61fff" };
    if (this.state.isCalendaTo) {
      if (day.dateString < this.state.dateSelectFrom) {
        return alert(I18n.t("Vui lòng chọn lại ngày"));
      }
      this.setState({
        markedDates: date,
        dateSelectTo: day.dateString,
        corlorTextTo: "#a5a5a5ff",
      });
    } else {
      if (day.dateString > this.state.dateSelectTo) {
        return alert(I18n.t("Vui lòng chọn lại ngày"));
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
      corlorTextTo: "#a5a5a5ff",
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
  render() {
    const from =
      this.state.dateSelectFrom === I18n.t("Từ ngày")
        ? I18n.t("Từ ngày")
        : moment(this.state.dateSelectFrom).format("DD-MM-YYYY");
    const to =
      this.state.dateSelectTo === I18n.t("Đến ngày")
        ? I18n.t("Đến ngày")
        : moment(this.state.dateSelectTo).format("DD-MM-YYYY");
    return (
      <View style={styles.container}>
        <View style={styles.wrapBody1}>
          <View style={styles.wrapBody}>
            <TouchableOpacity onPress={this._onCheckDateFrom}>
              <Text
                style={[styles.styleText, { color: this.state.corlorTextfrom }]}
              >
                {from}
              </Text>
            </TouchableOpacity>
            <View style={styles.wrapView} />
            <TouchableOpacity onPress={this._onCheckDateTo}>
              <Text
                style={[styles.styleText, { color: this.state.corlorTextTo }]}
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
              textDayHeaderFontSize: 18,
            }}
            onDayPress={this._onDayPress}
            style={styles.styleCalendar}
          />
        </View>
      </View>
    );
  }
}

export default index;
