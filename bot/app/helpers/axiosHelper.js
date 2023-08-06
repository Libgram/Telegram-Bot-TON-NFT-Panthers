const axios = require("axios");
const HttpsProxyAgent = require('https-proxy-agent');

const config = {
  timeout: 15000
}

module.exports = async (options, proxy, timeout = null) => {
  try{
  	if (!proxy) throw 'not proxy';
  	
  	const abort = axios.CancelToken.source()
	  const id = setTimeout(
	    () => abort.cancel(`Timeout of ${timeout || config.timeout}ms.`),
	    timeout || config.timeout
	  )
	  let optAxios = { cancelToken: abort.token };

	  
	  if (proxy !== 'no proxy') {
  		let agent = new HttpsProxyAgent(proxy);
  		optAxios.httpsAgent = agent;
	  }

	  optAxios = {...optAxios, ...options};
	  let response = await axios(optAxios);
	  clearTimeout(id)
	  return response;
  }
  catch(e) {throw e};
    
}
