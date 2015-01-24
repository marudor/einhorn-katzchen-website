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
  var e1 = [];
  episodes = _.each(episodes, e => { 
    if (e.indexOf('.json') !== -1) {
      var m = require('../../episodes/'+e);
      m.text = m.text.replace(m.rawTweet.entities.media[0].url,'');
      m.text = m.text.replace('#Einhornkätzchen', 'Einhornkätzchen');
      e1.push(m);
    }
  });
  res.render('index', {
    episodes: e1
  });
});


app.use('/episodes', express.static(path.resolve('../episodes')));
app.use('/lib', express.static(path.resolve('lib')));