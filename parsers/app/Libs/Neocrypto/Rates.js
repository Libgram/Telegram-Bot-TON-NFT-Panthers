const axios = require("../../Helpers/AxiosHelper");
const setCookie = require('set-cookie-parser');
const cheerio = require('cheerio');

const TelegramMod = require('../../models/TelegramModel');

class Auth {
 
  static async login({uuid, username, password, userAgent, proxy, domain, captcha_res, cookie}) {
     try{
      let axiosOptions = {
        url: `https://guest.api.arcadia.pinnacle.com/0.1/sessions`,
        method: 'POST',
        headers: 
         {
          'cache-control': 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua-mobile': '?0',
          'content-type': 'application/json',
          'accept': 'application/json',
          'user-agent': userAgent,
          'cookie': cookie,
          'origin': `https://${domain}`,
          'referer': `https://${domain}/`,
          'x-api-key': process.env.PINA_X_API_KEY,
          'x-device-uuid': uuid,
          },
             data: {"username": username,"password": password,"captchaToken":captcha_res,"trustCode":""}
       };

      let result = await axios(axiosOptions, proxy);
    
     if (!result || result.status !== 200 || !result.data || !result.data.username) throw '[PINA]: AUTH #2';
     let token = result.data.token;
     if (!token) throw '[PINA]: AUTH #3';
     return {token: token};
     }
     catch(e) {
      TelegramMod.sendErr({message: e});
      console.log(e);
      return;
     }

  }

  static async balance({uuid, token, username, password, userAgent, proxy, domain, captcha_res, cookie}) {
     try{
      let axiosOptions = {
        url: `https://guest.api.arcadia.pinnacle.com/0.1/wallet/balance`,
        method: 'GET',
        headers: 
         {
          'cache-control': 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua-mobile': '?0',
          'content-type': 'application/json',
          'accept': 'application/json',
          'user-agent': userAgent,
          'cookie': cookie,
          'origin': `https://${domain}`,
          'referer': `https://${domain}/`,
          'x-api-key': process.env.PINA_X_API_KEY,
          'x-device-uuid': uuid,
          'x-session': token,
          }
        };

      let result = await axios(axiosOptions, proxy);
  
     if (!result || result.status !== 200 || !result.data || !result.data.currency) throw '[PINA]: AUTH #2';
  
      return Number(result.data.amount);
     }
     catch(e) {
      TelegramMod.sendErr({message: e});
      console.log(e);
      return;
     }

  }

  static async start({userAgent, proxy, domain}) {
     try{
      let axiosOptions = {
        url: `https://${domain}`,
        method: 'GET',
        headers: 
         {
          'cache-control': 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-ch-ua-mobile': '?0',
          'user-agent': userAgent,
          'origin': `https://${domain}`,
          'referer': `https://${domain}/`,
          },
        };

      let result = await axios(axiosOptions, proxy);
    

      if (!result || !result.data) throw '[Pina]: AUTH #1';

       let cookies = setCookie.parse(result, {
        decodeValues: true
        });
        let cookieUnique = {};
        cookies.forEach(item => {
          cookieUnique[item.name] = item.value
        });
       return cookieUnique;

     }
     catch(e) {
      TelegramMod.sendErr({message: e});
      console.log(e);
      return;
     }

  }

}

module.exports = Auth;

