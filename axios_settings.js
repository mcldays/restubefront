const axios = require('axios').default;
//module.exports = axios.create({ baseURL : "http://localhost:5000"})   // for localhost
// module.exports = axios.create({ baseURL : "http://10.226.95.133:8080"})
module.exports = axios.create({ baseURL : "/api"})  // for docker
