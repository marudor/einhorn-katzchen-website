/*jshint camelcase: false */

const rss = require('rss'),
      moment = require('moment'),
      fs = require('fs'),
      _ = require('lodash');

var feed = new rss({
  title: 'Einhornkätzchen',
  description: 'Just a kitten with a horn',
  feed_url: 'einhornkaetzchen.de/rss',
  site_url: 'einhornkaetzchen.de',
  copyright: 'All content owned by @sweet_sacura',
  webMaster: '@marudor'
});

var xml;
var oldLength = 0;

function addRSS(tweet, index) {
  tweet.text = tweet.text.replace(tweet.rawTweet.entities.media[0].url,'');
  tweet.text = tweet.text.replace('#Einhornkätzchen', 'Einhornkätzchen');
  tweet.date = moment(tweet.rawTweet.created_at).format('DD.MM.YYYY');
  feed.item({
    title: tweet.text,
    description: '<img src="http://einhornkaetzchen.de/episodes/pictures/'+tweet.file+'">',
    url: 'einhornkaetzchen.de/#'+index,
    author: '@sweet_sacura',
    date: moment(tweet.rawTweet.created_at).toDate()
  });
  xml = null;
}

export function rssFeed() {
  var items = fs.readdirSync(path.resolve('../einhorn-kaetzchen/episodes'));
  if (items.length > oldLength) {
    var i = 1;
    _.each(items, item => {
      if (i > oldLength) {
        if (item.indexOf('.json') !== -1) {
          addRSS(require('../einhorn-kaetzchen/episodes/'+item), i);
        }
        i+=1;
      }
    });
    oldLength = items.length;
  }

  if (!xml) {
    xml = feed.xml();
  }
  return xml;
}
