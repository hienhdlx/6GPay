import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    TextInput,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import HeaderWithTwoText from '../Header/HeaderWithTwoText';
import I18n from '../../language/I18n';
import styles1 from '../Button/ButtonColor'
class RequestConfirmationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSchool:''
        };
    }

    componentDidMount(): void {
        let dataSchool = this.props.navigation.getParam('dataSchool');
        this.setState({dataSchool: dataSchool});
    }
    render() {
        let {dataSchool} = this.state;
        return (
            <View style={styles.Container}>
                <HeaderWithTwoText navigation={this.props.navigation} title={I18n.t('Thông Tin Thanh Toán')} message={'Edit'}/>
                <View style={styles.View1}>
                    <View style={styles.ViewImage1}>
                        <Image
                            style={styles.Image}
                            source={require('../../assets/icons/paper.png')}
                        />
                        <View style={styles.ViewText}>
                            <Text style={styles.chuyN}>{I18n.t('Chuyển đến')}</Text>
                            <Text style={styles.martinKarlsson}>{dataSchool.receiver}</Text>
                        </View>
                    </View>
                    <View style={{height:width/25,justifyContent:'center',width:width,paddingHorizontal:width/21,alignItems:'flex-end'}}>
                        <View
                            style={styles.Line}
                        />
                    </View>
                    <View style={{flexDirection: 'row',
                    }}>
                        <Image
                            style={styles.Image}
                            source={require('../../assets/icons/Group.png')}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width:'85%',
                            paddingLeft:width/15,
                            justifyContent:'space-between'

                        }}>
                            <Text style={styles.chuyN}>{I18n.t('Số tiền chuyển')}</Text>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: '700',
                                lineHeight: 22,
                                textAlignVertical:'center',
                                textAlign:'right',
                            }}>{dataSchool.money}</Text>
                        </View>
                    </View>
                    <View style={{width:width,paddingHorizontal:width/18,marginTop:width/15}}>
                        <TextInput
                            style={styles.StyleTextIP}
                            placeholder={"Comment"}
                            placeholderTextColor={'#727272'}
                            value={dataSchool.content}
                        />
                    </View>
                </View>
                <View style={styles.View2}>
                    <View style={styles.ViewCheck}>
                        <Image
                            style={styles.Image}
                            source={require('../../assets/icons/Rectangle.png')}
                        />
                        <Text style={styles.TextGold}>{I18n.t('Lưu dưới dạng mẫu')}</Text>
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
                                // onPress = {() => this.props.navigation.navigate('MainOTPsend')}
                                style={styles1.viewButton2}>
                                <View style={styles1.viewTouchsmall}>
                                    <Text style={styles1.text6}>{I18n.t('Xác Nhận')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 35 : 0,
        backgroundColor: '#000000',
    },

    View1: {
        flex: 7,
        alignItems: 'center',
    },
    View2: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image: {
        width: width / 20,
        height: width / 20
    },
    ViewImage1: {
        flexDirection: 'row',
        marginTop: height / 6,
    },
    ViewImage2: {flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    ViewText: {
        flexDirection: 'row',
        width:'85%',
        paddingLeft:width/15,
        justifyContent:'space-between'

    },
    ViewText1: {
        flexDirection: 'row',
        backgroundColor:'green',
        width:'80%'

    },
    ViewCheck: {
        flexDirection: 'row',
        marginBottom: width / 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ViewButton: {flexDirection: 'row',
        paddingVertical: 10
    },
    chuyN: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        textAlignVertical:'center'

    },
    martinKarlsson: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        textAlignVertical:'center',
        textAlign:'right',
    },
    TextGold: {
        height: 28,
        color: '#d2a61f',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        marginLeft: 10,
    },
    Line:{
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: 1,
        width:'89.5%'
    },
    StyleTextIP:{height: 40,color: '#727272',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        borderBottomWidth:1,
        borderBottomColor:'#cbcbcb',
    }
});
export default RequestConfirmationScreen;
