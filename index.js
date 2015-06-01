'use strict'

var _cache = {}

function hasCache(uri) {
  return !!_cache[uri]
}

function shouldCache(res) {
  var cacheControl = res.headers['cache-control']
  return cacheControl && cacheControl !== 'no-cache'
}

function responseCallback(uri, callback) {
  return function onResponse(err, res, body) {
    if (shouldCache(res)) {
      _cache[uri] = res
    }

    callback(err, res, body)
  }
}

module.exports = function cache(request) {

  return function requestWrapper(uri, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    if (hasCache(uri)) {
      return callback(null, _cache[uri], _cache[uri].body)
    }

    request(uri, options, responseCallback(uri, callback))
  }
}
