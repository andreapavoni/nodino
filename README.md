# Nodino
An experiment to make a simple web app using [ExpressJS](http://expressjs.com), [React](http://facebook.github.io/react/) and [Redis](http://redis.io).

## Demo
You can find a working demo [here](http://nodino.herokuapp.com/).

**NOTE**: The online demo has a safe-mode that deletes links after 30 minutes, to reduce spam impact.

## Installation

You'll need a working installation of Redis and NodeJS, then:

* run `npm install`
* start a Redis server
* verify/edit settings in `config.js`
* run `npm start`
* to run it, you can use one of the following commands:
  * `npm start`
  * `coffee bin/www` or `bin/www`
  * `foreman start` (there's a Procfile ready for [heroku](http://heroku.com))
* point your browser to `http://0.0.0.0:4000` (or to a different port if you changed it in `config.js`)

## Contributing

1. Fork it!
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

### Testing

* run `npm test` (or just `gulp`)

## License

Copyright (c) 2014 Andrea Pavoni http://andreapavoni.com
