import axios from 'axios';

const corsUrl = process.env.REACT_APP_API_ENDPOINT;
export const getPaymentSecret = (body: any) => axios.post(corsUrl + '/payment/secret', body);
