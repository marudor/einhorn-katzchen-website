const express = require('express'),
      app = express(),
      fs = require('fs'),
      path = require('path'),
      expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.listen(61182);


app.get('/', (req, res) => {
  var episodes = fs.readdirSync('../episodes');
  res.render('index', {
    episodes: episodes
  });
});


app.use('/episodes', express.static(path.resolve('../episodes')));
app.use('/lib', express.static(path.resolve('lib')));