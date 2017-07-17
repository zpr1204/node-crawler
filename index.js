var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next) {
    superagent.get('https://juejin.im')
        .end(function(err, sres) {
            if (err) {
                console.log(111111);
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('ul.entry-list .title').each(function(idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.text(),
                    href: $element.attr('href')
                });
            });

            res.send(items);
        });
});


app.listen(3000, function() {
    console.log('app is listening at port 3000');
});