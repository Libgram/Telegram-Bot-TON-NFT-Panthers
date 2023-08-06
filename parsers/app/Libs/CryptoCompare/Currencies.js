const axios = require("../../Helpers/AxiosHelper");

class Quotes {
 
  static async get() {
     try{
      let axiosOptions = {
        url: `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=TONCOIN,USDT,EUR,USD,RUB,UAH,KZT&api_key=4811396748f0420e8846319acddb5c41637127508388043827b484f3d2fbc482`,
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

}

module.exports = Quotes;

