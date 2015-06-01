'use strict'

var tap     = require('tap')
var nock    = require('nock')

var cache   = require('../')
var request = cache(require('request'))

tap.test('Cache-Control: public', function(publicTests) {

  tap.test('Caches response with a future Expires header', function(t) {
    nock('http://example.com')
      .get('/cacheable')
      .reply(200, 'OK', {
          'Cache-Control': 'public',
          Expires: 'Fri, 01 Jan 2100 12:00:00 GMT'
      })

    request('http://example.com/cacheable', function(err, response1) {
      t.error(err)

      request('http://example.com/cacheable', function(err, response2) {
        t.error(err)
        t.strictEqual(response2, response1)
        t.end()
      })
    })
  })

  publicTests.end()
})

tap.test('Cache-Control: no-cache', function(noCacheTests) {

  tap.test('Does not cache response', function(t) {
    nock('http://example.com')
      .get('/not-cacheable')
      .reply(200, 'OK', {
          'Cache-Control': 'no-cache'
      })
      .get('/not-cacheable')
      .reply(200, 'OK', {
          'Cache-Control': 'no-cache'
      })

    request('http://example.com/not-cacheable', function(err, response1) {
      t.error(err)

      request('http://example.com/not-cacheable', function(err, response2) {
        t.error(err)
        t.notStrictEqual(response2, response1)
        t.end()
      })
    })
  })

  noCacheTests.end()
})
