const Axios = require('axios');
const {SNIPCART_SECRET_API_KEY} = process.env;

const API_ENDPOINT = 'https://app.snipcart.com/api/products';

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
    const stock = await Axios.get(API_ENDPOINT, {
        headers: {
        Authorization: auth,
        Accept: 'application/json',
        },
    })
        .then(response => {
        let results = [];
        if (response.data) {
            const {items} = response.data;
            if (items) {
            results = items.map(i => {
                return {
                id: i.userDefinedId,
                stock: i.stock,
                };
            });
            }
        }
        return results;
        })
        .catch(error => {

            return res.status(422).json({body: String(error)})
            
        });

    res.status(200).json(stock);
};

module.exports = allowCors(callAPI)