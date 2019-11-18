import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';

class HeaderOnlyProfile extends Component {

    render() {
        return (
            <View style={{width: width, height:height*0.07, backgroundColor: '#d2a61f', flexDirection: 'row'}}>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: width / 18,
                                height: width / 18,
                            }}
                            source={require('../../assets/icons/Iconperson.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 7}}>
                </View>

            </View>
        );
    }
}

export default HeaderOnlyProfile;
