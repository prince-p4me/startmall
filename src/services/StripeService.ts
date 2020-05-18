import  axios from 'axios';
const corsUrl = "https://us-central1-slashiee.cloudfunctions.net/api";
export const getPaymentSecret = (body: any) => axios.post(corsUrl + '/payment/secret', body);