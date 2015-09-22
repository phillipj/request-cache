'use strict'

var tape = require('tape')
var nock = require('nock')

var cache = require('../')
var request = cache(require('request'))

tape('[Cache-Control: public] Caches response with a future Expires header', function (t) {
  cache._flushCache()

  nock('http://example.com')
    .get('/cacheable')
    .reply(200, 'OK', {
      'Cache-Control': 'public',
      Expires: 'Fri, 01 Jan 2100 12:00:00 GMT'
    })

  request('http://example.com/cacheable', function (err, response1) {
    t.error(err)

    request('http://example.com/cacheable', function (err, response2) {
      t.error(err)
      t.strictEqual(response2, response1)
      t.end()
    })
  })
})
