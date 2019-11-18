import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../components/LoginScreen';
import MainOTP from '../components/MainOTP';
import DuplucationScreen from '../components/DuplucationScreen';
import RequestScreen from '../components/RequestScreen';
import PhoneBook from '../components/Phonebook';
import RegisterScreen from '../components/RegisterScreen';
import WellcomeMemBer from '../components/WellcomeMemBer';
import AccountVerification from '../components/AccountVerification';
import SendScreen from '../components/SendScreen'
import SuccessfulScreen from '../components/SuccessfulScreen';
import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../components/ManinScreen';
import Profile from '../components/Profile';
import AssociatedBank from '../components/AssociatedBank';
import PersonalInformation from '../components/PersonalInformation';
import Associate from '../components/Associate';
import AssociateSuccess from '../components/AssociateSuccess';
import PaymentInfo from '../components/PaymentInfo';
import RequestConfirmationScreen from '../components/RequestComfirmationScreen';
import MainOTPsend from '../components/MainOTPsend';
import Contact from '../components/Contact';
import Menu from '../components/ManinScreen/Menu';
import EditProfile from '../components/Profile/EditProfile';
import Fillter from '../components/Fillter';
import Result from '../components/Fillter/Result';
import forgotPass from '../components/LoginScreen/forgotPass'

const MainNavigator = createStackNavigator(
  {
      LoginScreen,
      MainScreen,
      DuplucationScreen,
      RequestScreen,
      PhoneBook,
      Contact,
      RegisterScreen,
      MainOTP,
      WellcomeMemBer,
      SendScreen,
      AccountVerification,
      SuccessfulScreen,
      Profile,
      EditProfile,
      Menu,
      AssociatedBank,
      PersonalInformation,
      Associate,
      AssociateSuccess,
      PaymentInfo,
      RequestConfirmationScreen,
      MainOTPsend,
      Fillter,
      Result,
      forgotPass,
  },
  {
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator(
  {
    LoginScreen,
  },
  {
    headerMode:'none'
  }
);

const SwitchStack = createSwitchNavigator(
  {
    SplashScreen,
    AuthStack,
    MainNavigator,
  },
  {
    // initialRouteName: 'MainNavigator'
  }
)

export default createAppContainer(SwitchStack);
