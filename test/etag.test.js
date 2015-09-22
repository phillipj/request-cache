'use strict'

var tape = require('tape')
var nock = require('nock')

var cache = require('../')
var request = cache(require('request'))

tape('[Etag] Adds If-None-Match to requests if etag has been received', function (t) {
  cache._flushCache()

  nock('http://example.com')
                .get('/cacheable')
                .reply(200, 'OK', {
                  'Etag': 'imaginary-etag-hash'
                })

  var scope = nock('http://example.com', {
    reqheaders: {
      'If-None-Match': 'imaginary-etag-hash'
    }
  })
  .get('/cacheable')
  .reply(304)

  request('http://example.com/cacheable', function (err) {
    t.error(err)

    request('http://example.com/cacheable', function (err) {
      t.error(err)
      t.ok(scope.isDone(), 'requests satisfied')
      t.end()
    })
  })
})

tape('[Etag] Returns cached response when server responds with 304', function (t) {
  cache._flushCache()

  nock('http://example.com')
    .get('/cacheable')
    .reply(200, 'OK', {
      'Etag': 'imaginary-etag-hash'
    })

  nock('http://example.com', {
    reqheaders: {
      'If-None-Match': 'imaginary-etag-hash'
    }
  })
  .get('/cacheable')
  .reply(304)

  request('http://example.com/cacheable', function (err, response1) {
    t.error(err)

    request('http://example.com/cacheable', function (err, response2) {
      t.error(err)
      t.strictEqual(response1, response2)
      t.end()
    })
  })
})
