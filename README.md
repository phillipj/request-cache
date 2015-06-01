# request-cache

Cache wrapper around the popular request.js module.

## Usage

```js
var cache   = require('request-cache')
var request = cache(require('request'))

request('http://example.com', function(err, res, body){
  console.log('Response from example.com', body)

  request('http://example.com', function(err, res, body){
    console.log('Cached response from example.com', body)
  })
})
```

## Still very much work in progress!