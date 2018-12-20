'use strict';

var qs = require('querystring')

/**
 * Converts the text input to "lacey" formatted text.
 * For example: This is a test -> t H i S i S a T e S t
 * @param {string} text The text to format.
 */
const toLacey = text => {
  text = text.split("");
  var count = 0;

  for (var i = 0; i < text.length; i++) {
    // Case insensitive RegEx
    if (/^[A-Z]$/i.test(text[i])) {
      if (count % 2) {
        text[i] = text[i].toUpperCase();
      } else {
        text[i] = text[i].toLowerCase();
      }

      count++;
    }
  }

  return text.join('');
}

/**
 * Converts the text input to "bum" formatted text.
 * For example: This is a test -> T H I S I S A T E S T
 * @param {string} text The text to format.
 */
const toBum = text => {
  text = text.split('');
  const n = text.length;
  
  for (var i = n - 1; i >= 0; i--) {
    if (!/\s/.test(text[i]) && (i + 1 < n && !/\s/.test(text[i + 1]))) {
      text.splice(i + 1, 0, ' ');
    }
  }

  console.log(text);
  
  return text.join('').trim().toUpperCase();
}

/**
 * Converts the text input to "leet" formatted text.
 * For example: This is a test -> 741$ 1$ @ 73$7
 * @param {string} text The text to format.
 */
const toLeet = text => {
  const chars = {
    a: '@',
    b: '8',
    c: '(',
    e: '3',
    g: '6',
    h: '4',
    i: '1',
    l: '|',
    o: '0',
    q: '9',
    s: '$',
    t: '7',
    z: '2'
  };

  for (var ch in chars) {
    text = text.replace(ch, chars[ch]);
  }
  
  return text;
}

/**
 * Converts the text input to "quickmaths" formatted text.
 * For example: This is a test -> becomes italicized.
 * @param {string} text The text to format.
 */
const toQuickMaths = text => '\x1B[3m' + text.trim().toUpperCase() + '\x1B[23m';

exports.handler = async (event) => {
  const query = qs.parse(event.body).text;
  const style = query.substr(0, query.indexOf(' ')).toLowerCase();
  var text = query.substr(query.indexOf(' ') + 1);

  // Styles: lacey, bum, leet, or quickmaths
  switch (style) {
    case 'lacey':
      text = toLacey(text);
      break;
    case 'bum':
      text = toBum(text);
      break;
    case 'leet':
      text = toLeet(text);
      break;
    case 'quickmaths':
      text = toQuickMaths(text);
      break;
  }

  const response = {
    statusCode: 200,
    body: text,
  };

  return response;
};