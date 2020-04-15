const axios = require("axios");
const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
const api_key = "api_key=ep4mhp9htpj2xkron0rlbhtlzropsxd5ujrm0ftf";
export const getFeedListing = url => axios.get(`${corsUrl}${url}&${api_key}`);