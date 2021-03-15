const Axios = require('axios');
const {SNIPCART_SECRET_API_KEY} = process.env;

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
}

const callAPI = async (req, res) => {

  const auth = 'Basic ' + Buffer.from(SNIPCART_SECRET_API_KEY + ':' + '').toString('base64');
  const API_ENDPOINT = req.body ? `https://app.snipcart.com/api/products/${req.body.productId}` : 'https://app.snipcart.com/api/products';

  if (req.body) {
    // if we are querying only for one product
    try {
      const response = await Axios.get(API_ENDPOINT, {
        headers: {
        Authorization: auth,
        Accept: 'application/json',
        },
      })
      
      console.log("This is response: ", response);
      
      if (response.data.stock) {
        res.status(200).json(reponse.data.stock);
      } else {
        res.status(200).json(0);
      }

    } catch(err) {
      if (err.response) {
        res.status(err.response.status).json({body: String(err)})
      } else {
        res.status(500).json({body: String(err)})
      }
    }
  } else {
    // if we are querying for the whole stock
    try {
      const response = await Axios.get(API_ENDPOINT, {
        headers: {
        Authorization: auth,
        Accept: 'application/json',
        },
      })
      console.log("This is response: ", response);

      let results = [];
      if (response.data) {
        const {items} = response.data;
        
        if (items) {
          results = items.map(i => {
              return {
              id: i.userDefinedId,
              stock: i.stock || 0,
              };
          });
        }
      }
      
      res.status(200).json(results);

    } catch(err) {
      if (err.response) {
        res.status(err.response.status).json({body: String(err)})
      } else {
        res.status(500).json({body: String(err)})
      }
    }
  }
    
    
};

module.exports = allowCors(callAPI)