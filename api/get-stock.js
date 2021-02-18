const Axios = require('axios');
const {SNIPCART_SECRET_API_KEY} = process.env;

const API_ENDPOINT = 'https://app.snipcart.com/api/products';

const callAPI = async (req, res) => {
  const auth = 'Basic ' + Buffer.from(SNIPCART_SECRET_API_KEY + ':' + '').toString('base64');
  const stock = await Axios.get(API_ENDPOINT, {
    headers: {
      Authorization: auth,
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      let results = [];
      if (data) {
        const {items} = data;
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

  res.status(200).set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  }).json(stock);
};

module.exports = callAPI;