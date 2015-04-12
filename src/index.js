import {rssFeed} from './rss';

const express = require('express'),
      app = express(),
      fs = require('fs'),
      _ = require('lodash'),
      path = require('path'),
      moment = require('moment'),
      expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.listen(62601);


app.get('/', (req, res) => {
  var episodes = fs.readdirSync('../episodes');
  var e1 = [];
  episodes = _.map(episodes, e => {
	  if (e.indexOf('.json') !== -1) {
	  	return require('../../episodes/'+e);
	}
  });
  episodes = _.without(episodes, undefined);
  _.each(episodes, m => {
	  m.timestamp = moment(m.rawTweet.created_at);
  });
  episodes = _.sortBy(episodes, 'timestamp');

  _.each(episodes, m => { 
      m.text = m.text.replace(m.rawTweet.entities.media[0].url,'');
      m.text = m.text.replace('#Einhornkätzchen', 'Einhornkätzchen');
      m.date = m.timestamp.format('DD.MM.YYYY HH:mm');
      e1.push(m);
  });
  res.render('index', {
    episodes: e1
  });
});


app.use('/episodes', express.static(path.resolve('../episodes')));
app.use('/lib', express.static(path.resolve('lib')));
app.get('/rss', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(rssFeed());
});
