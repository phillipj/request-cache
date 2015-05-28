var util    = require('util')
var extend  = require('util')._extend

var _cache  = {}

function hasCache(uri) {
  return !!_cache[uri]
}

function responseCallback(uri, callback) {
  return function onResponse(err, response, body) {
    _cache[uri] = response
    callback(err, response, body)
  }
}

module.exports = function cache(request) {

  return function requestWrapper(uri, options, callback) {
    if (typeof options == 'function') {
      callback = options
      options = {}
    }

    if (hasCache(uri)) {
      return callback(null, _cache[uri], _cache[uri].body)
    }

    request(uri, options, responseCallback(uri, callback))
  }
}