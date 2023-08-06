const axios = require("../../Helpers/AxiosHelper");

class Gecko {
 
  static async rates() {
     try{
      let axiosOptions = {
        url: `https://api.coingecko.com/api/v3/simple/price?ids=the-open-network,tether&vs_currencies=usd,eur,btc,eth,rub,uah`,
        method: 'GET',
       };

      let result = await axios(axiosOptions, 'no proxy');
      if (!result?.data) return;
      return result?.data;
  
      
     }
     catch(e) {
      console.log(e);
      return;
     }

  }

  static async info() {
     try{
      let axiosOptions = {
        url: `https://api.coingecko.com/api/v3/coins/the-open-network`,
        method: 'GET',
       };

      let result = await axios(axiosOptions, 'no proxy');
      if (!result?.data) return;
      return result?.data;
  
      
     }
     catch(e) {
      console.log(e);
      return;
     }

  }


  static async chart() {
     try{
      let axiosOptions = {
        url: `https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=1`,
        method: 'GET',
       };

      let result = await axios(axiosOptions, 'no proxy');
      if (!result?.data?.prices) return;
      return result?.data?.prices;
  
      
     }
     catch(e) {
      console.log(e);
      return;
     }

  }

}

module.exports = Gecko;

