const axios = require('axios');

function getApi() {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = getApi;