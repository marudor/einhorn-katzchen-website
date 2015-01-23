const express = require('express'),
      app = express(),
      fs = require('fs'),
      _ = require('lodash'),
      path = require('path'),
      expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.listen(61182);


app.get('/', (req, res) => {
  var episodes = fs.readdirSync('../episodes');
  episodes = _.filter(episodes, function(e) { 
    return e.endsWith('json');
  });
  episodes = _.map(episodes, function(e) {
    return require('episodes/'+e.file);
  });
  res.render('index', {
    episodes: episodes
  });
});


app.use('/episodes', express.static(path.resolve('../episodes/pictures')));
app.use('/lib', express.static(path.resolve('lib')));