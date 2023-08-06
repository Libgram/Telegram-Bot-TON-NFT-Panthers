const axios = require("../../Helpers/AxiosHelper");

class Rates {
 
  static async getMarkets({category}) {
     try{
      let axiosOptions = {
        url: `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=toncoin&start=1&limit=100&category=${category}&sort=cmc_rank_advanced`,
        method: 'GET',
       };

      let result = await axios(axiosOptions, 'no proxy');
      if (!Array.isArray(result?.data?.data?.marketPairs) || result?.data?.data?.marketPairs?.length <=0 ) return;
      let pairs = result?.data?.data?.marketPairs;
      let ps = [];
      pairs.forEach(pair => {
        ps.push({
          source: pair.exchangeName,
          category: pair.category,
          pair: pair.marketPair,
          from: pair.quoteSymbol,
          to: pair.baseSymbol,
          currency: pair.quoteSymbol,
          price: pair.quote,

        })
        
      })

      return ps;
      
     }
     catch(e) {
      console.log(e);
      return;
     }

  }

}

module.exports = Rates;

