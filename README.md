# request-cache

[![Build Status](https://api.travis-ci.org/phillipj/request-cache.png?branch=master)](http://travis-ci.org/phillipj/request-cache)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

# Contributing

request-cache is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [contribution guide](CONTRIBUTING.md) for more details.

# Contributors

<table><tbody>
<tr><th align="left">Phillip Johnsen</th><td><a href="https://github.com/phillipj">GitHub/phillipj</a></td><td><a href="http://twitter.com/phillipjohnsen">Twitter/@phillipjohnsen</a></td></tr>
</tbody></table>

# License

Copyright &copy; 2015 **request-cache** contributors.

**request-cache** is licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included `LICENSE.md` file for more details.
