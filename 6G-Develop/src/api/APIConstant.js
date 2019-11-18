const API = {
    acccessToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwX3VzZXIiLCJwaG9uZV9udW1iZXIiOiI4NDk0NzIyNTE3OSIsImV4cCI6MTU3MjM0MDQyMH0.4QJBH7JXXZCdHR6IgWWVPWIgFv1SjRHJ-KY-48qnPJg',
    resgiter: '/rpc/register_user',
    baseurl: 'http://3.124.107.180:3000',
    urlOTP: 'http://api.helisoft.vn/oauth/sso/',
    getUserByUserID:'/users?user_id=eq.',
    getUserbyPhone: (phone) => {
        return '/users?phone_number=eq.' + phone;
    },
    getWalletbyIdUser: (id) => {
        return '/wallet?user_id=eq.' + id;
    },
    getReceiverWalletId: (id) => {
        return '/requests?receiver_wallet_id=eq.' + id + '&request_status=eq.0';
    },
    editInformation: (id) => {
        return '/users?user_id=eq.' +id
    } ,
    createrWallet:'/wallet',
    topup:'/rpc/topup',
    withdraw:'/rpc/withdrawal',
    debitcard: (id) => {
        return '/debit_card?user_id=eq.' + id;
    },
};


export default API;
