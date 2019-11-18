import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    FlatList
} from 'react-native';
import HeaderSearch from '../Header/HeaderSearch';
import styles from './AssociatedBankStyle';
import commonStyle from '../../Style/CommonStyle';
import I18n from '../../language/I18n';
const {width, height} = Dimensions.get('screen');

const data = [
    {
        key: "MBBank",
        image: require("../../assets/images/banks/MB.png")
    },
    {
        key: "VietComBank",
        image: require("../../assets/images/banks/VC.png")
    },
    {
        key: "BIDV",
        image: require("../../assets/images/banks/BID.png")
    },
    {
        key: "Sacombank",
        image: require("../../assets/images/banks/SAC.png")
    },
    {
        key: "Eximbank",
        image: require("../../assets/images/banks/Exim.png")
    },
    {
        key: "TMCP Sài Gòn",
        image: require("../../assets/images/banks/SCB.png")
    },
    {
        key: "Bản Việt",
        image: require("../../assets/images/banks/BV.png")
    },
    {
        key: "VietinBank",
        image: require("../../assets/images/banks/VTB.png")
    },
    {
        key: "Agribank",
        image: require("../../assets/images/banks/AGR.png")
    },
    {
        key: "MSB",
        image: require("../../assets/images/banks/MSB.png")
    },
    {
        key: "Nam A Bank",
        image: require("../../assets/images/banks/NAB.png")
    }
];

class index extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            header: null,

        };
    };
    state = {
      userId: ''
    };

  componentDidMount() {
    let userId = this.props.navigation.getParam("userId");
    console.log("idUserBank", userId);
    this.setState({ userId: userId });
  }

    _presentToPersonalInfo = () => {
    let userId = this.props.navigation.getParam("userId");
    const params = { userId: userId };
    this.props.navigation.navigate('PersonalInformation', {data: params}) ;
    };
    _bankItem = ({ item }) => {
        if (item.key == 'MBBank'){
            const image = item.image;
            return (
                <View style={styles.Item}>
                    <TouchableOpacity
                        style={styles.btnBank}
                        onPress={this._presentToPersonalInfo}
                    >
                        <Image
                            resizeMode="contain"
                            source={image}
                            style={{width: "100%"}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }else{
            const image = item.image;
            return (
                <View style={styles.Item}>
                    <TouchableOpacity
                        style={[styles.btnBank,{backgroundColor:'gray'}]}
                    >
                        <Image
                            resizeMode="contain"
                            source={image}
                            style={{width: "100%"}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    };

    render() {
        return (
            <View style={commonStyle.container}>
                <HeaderSearch navigation={this.props.navigation}/>
                <ScrollView>
                    <Text style={styles.TextAssociate}>{I18n.t('Ngân hàng liên kết')}</Text>
                    <FlatList data={data} renderItem={this._bankItem} numColumns={3} style={{padding: 15}}/>
                </ScrollView>
            </View>
        );
    }
}


export default index;
