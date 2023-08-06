const axios = require("../../Helpers/AxiosHelper");

class Rate {
 
  static async get({amount,i,o,t}) {
     try{
      let axiosOptions = {
        method: 'GET',
       };
      if (t) {
        axiosOptions.url = `https://api.mercuryo.io/v1.6/widget/sell/rate?from=${i}&to=${o}&amount=${amount}&widget_id=67710925-8b40-4767-846e-3b88db69f04d&is_total=${t}`
      } else{
        axiosOptions.url = `https://api.mercuryo.io/v1.6/widget/buy/rate?from=${o}&to=${i}&amount=${amount}&widget_id=67710925-8b40-4767-846e-3b88db69f04d&is_total=${t}`
      
      }
      console.log(axiosOptions.url);
      let result = await axios(axiosOptions, 'no proxy');

      if (result?.data?.status !== 200) return;
      let data = result?.data?.data;
      let price = Number(data.fiat_amount/amount);
      if (price === price && price) {
        return price
      }
     }
     catch(e) {
      console.log(e);
      return;
     }

  }

}

module.exports = Rate;

