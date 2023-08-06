const axios = require("../../Helpers/AxiosHelper");

class Quotes {
 
  static async get({currency, id}) {
     try{
      let axiosOptions = {
        url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${currency}&CMC_PRO_API_KEY=ba1446c9-1152-4395-8d60-cd5e3498b0d7`,
        method: 'GET',
       };

      let result = await axios(axiosOptions, 'no proxy');
      if (!result?.data?.data[id]) return;
      let quote = result?.data?.data[id];
      let price = Number(quote?.quote?.USD?.price);
      if (price !== price || price <= 0) return;
    
        
    
      return {
        price,
        currency,
        date_update: Date.now()
      };
      
     }
     catch(e) {
      console.log(e);
      return;
     }

  }

}

module.exports = Quotes;

