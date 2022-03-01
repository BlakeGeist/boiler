import axios from 'axios';

const getDividends = (symbol) => {
    var options = {
        method: 'GET',
        url: 'https://yahoofinance-stocks1.p.rapidapi.com/dividends',
        params: {Symbol: symbol, OrderBy: 'Ascending'},
        headers: {
          'x-rapidapi-host': 'yahoofinance-stocks1.p.rapidapi.com',
          'x-rapidapi-key': 'f0e8153803msh7efbc70383f5751p1baaecjsn6c32aa1b3e5a'
        }
      };
      
      return axios.request(options).then(function (response) {
          return response.data
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      }); 
}

export default getDividends;