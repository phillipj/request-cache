var cache = require('../')
var request = cache(require('request'))

request('http://m.finn.no/', function onResponse(err, response, body) {
    console.log('Got 1. response', response.statusCode)

    request('http://m.finn.no/', function onResponse2(err, response, body) {
        console.log('Got 2. response', response.statusCode)

        request('http://m.finn.no/', function onResponse2(err, response, body) {
            console.log('Got 3. response', response.statusCode)
        })
    })
})