'use strict'

var tape    = require('tape')
var nock    = require('nock')

var cache   = require('../')
var request = cache(require('request'))

tape('[Cache-Control: no-cache] Does not cache response', function(t) {
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
