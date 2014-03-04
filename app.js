var stack = require('simple-stack-common');
var superagent = require('superagent');
var Blarney = require('blarney');

var app = module.exports = stack({
  base: {
    host: 'x-orig-host',
    path: 'x-orig-path',
    port: 'x-orig-port',
    proto: 'x-orig-proto'
  }
});

app.useBefore('router', function locals(req, res, next) {
  var url = req.base + (req.url === '/' ? '' : req.url);
  res.locals({
    url: url,
    root: req.get('x-root') || req.base
  });
  var _json = res.json;
  res.json = function(data) {
    var root = res.locals.root;
    data.root = {href: root};
    data.href = url;
    _json.call(res, data);
  };
  res.set('cache-control', 'max-age=3600');
  next();
});

/*
  collection/(?query|:id)
*/

app.get('/', function(req, res) {
  res.json({
    datasets: {href: req.base + '/datasets'}
  });
});


app.get('/datasets', function (req, res) {
  res.json({
    data: [
      {href: req.base + '/datasets/utah-transit-authority', title: 'Utah Transit Authority'},
      {href: req.base + '/datasets/bay-area-rapid-transit', title: 'Bay Area Rapid Transit'}
    ]
  });
});

app.get('/datasets/:provider', function (req, res) {
  res.json({
    title: 'data provider name goes here',
    data: [
      {href: req.base + '/datasets/utah-transit-authority/bus', title: 'Bus'},
      {href: req.base + '/datasets/utah-transit-authority/rail', title: 'Rail'}
    ]
  });
});


app.get('/datasets/:provider/:type', function (req, res) {
  res.json({
    title: 'type name goes here',
    data: [
      {href: req.base + '/datasets/utah-transit-authority/bus/805', title: 'Route 805'}
    ]
  });
});

app.get('/datasets/:provider/:type/:route', function (req, res) {
  res.json({
    title: 'route name goes here', // short_name?
    trips: {href: req.base + '/datasets/utah-transit-authority/bus/805/trips'},
    stops: {href: req.base + '/datasets/utah-transit-authority/bus/805/stops'},
    shape: {href: req.base + '/datasets/utah-transit-authority/bus/805/shape'},
    // GTFS Properties
    longName: '',
    color: '#ffffff',
    textColor: '#000000'
  });
});


app.get('/datasets/:provider/:type/:route/trips', function (req, res) {
  res.json({
  });
});

app.get('/datasets/:provider/:type/:routes/trips/:trip', function (req, res) {
  res.json({
  });
});

app.get('/datasets/:provider/:type/:route/stops', function (req, res) {
  res.json({
  });
});

app.get('/datasets/:provider/:type/:route/stops/:stop', function (req, res) {
  res.json({
  });
});

app.get('/datasets/:provider/:type/:route/shape', function (req, res) {
  res.json({
  });
});
