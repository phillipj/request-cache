'use strict'

var tape    = require('tape')

var cache   = require('../')
var request = cache(require('request'))
var actualRequest = require('request')

tape('[API: methods] exposes the same methods as request', function(t) {
  ['get', 'patch', 'post', 'put', 'head', 'del'].forEach(function(method) {
    t.strictEqual(request[method], actualRequest[method], method + '() is equal to request.' + method + '()')
  })
  t.end()
})
