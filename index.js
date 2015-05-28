var util    = require('util')
var extend  = require('util')._extend

var _cache  = {}

function hasCache(uri) {
  return !!_cache[uri]
}

function cacheResponse(uri, response) {
  _cache[uri] = response
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

    // Doesnt work as planned as the `callback` is added
    // as a listener to complete-event BEFORE we are able to do it
    // in the line below. This means if we run two subsequent requests,
    // the second request wont get reponse from cache as we havent
    // been able to cache it yet (event loop and tick)
    return request(uri, options, callback).once('complete', cacheResponse.bind(null, uri))
  }
}