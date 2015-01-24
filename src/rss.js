/*jshint camelcase: false */

const rss = require('rss'),
      moment = require('moment'),
      fs = require('fs'),
      _ = require('lodash');

var feed = new rss({
  title: 'Einhornkätzchen',
  description: 'Just a kitten with a horn',
  feed_url: 'einhornkatzchen.de/rss',
  site_url: 'einhornkatzchen.de',
  copyright: 'All content owned by @sweet_sacura',
  webMaster: '@marudor'
});

var xml;
var oldLength = 0;

function addRSS(tweet) {
  tweet.text = tweet.text.replace(tweet.rawTweet.entities.media[0].url,'');
  tweet.text = tweet.text.replace('#Einhornkätzchen', 'Einhornkätzchen');
  tweet.date = moment(tweet.rawTweet.created_at).format('DD.MM.YYYY');
  feed.item({
    title: tweet.text,
    description: '<img src="http://einhornkatzchen.de/episodes/pictures/"'+tweet.file+'.png',
    url: 'einhornkatzchen.de',
    author: '@sweet_sacura',
    date: moment(tweet.rawTweet.created_at).toDate()
  });
  xml = null;
}

export function rssFeed() {
  var items = fs.readdirSync('../episodes');
  if (items.length > oldLength) {
    oldLength = items.length;
    _.each(items, item => {
      if (item.indexOf('.json') !== -1) {
        addRSS(require('../../episodes/'+item));
      }
    });
  }

  if (!xml) {
    xml = feed.xml();
  }
  return xml;
}