'use strict';

import { APIGatewayEvent } from "aws-lambda";
var qs = require('querystring');

/**
 * Converts the text input to "lacey" formatted text.
 * For example: This is a test -> t H i S i S a T e S t
 * @param {string} text The text to format.
 * @returns {string} The formatted text.
 */
const toLacey: (text: string) => string = (text) => {
  let charArr = text.split("");
  var count = 0;
  
  return charArr.map((char: string) => {
    if (/^[A-Z]$/i.test(char)) {
      if (count % 2) {
        char = char.toUpperCase();
      } else {
        char = char.toLowerCase();
      }

      count++;
    }

    return char;
  }).join('');
}

/**
 * Converts the text input to "bum" formatted text.
 * For example: This is a test -> T H I S I S A T E S T
 * @param {string} text The text to format.
 * @returns {string} The formatted text.
 */
const toBum: (text: string) => string = (text) => {
  let textArr = text.split('');
  const n = text.length;
  
  for (var i = n - 1; i >= 0; i--) {
    if (!/\s/.test(text[i]) && (i + 1 < n && !/\s/.test(text[i + 1]))) {
      textArr.splice(i + 1, 0, ' ');
    }
  }
  
  return textArr.join('').trim().toUpperCase();
}

/**
 * Converts the text input to "leet" formatted text.
 * For example: This is a test -> 741$ 1$ @ 73$7
 * @param {string} text The text to format.
 * @returns {string} The formatted text.
 */
const toLeet: (text: string) => string = text => {
  const chars: {[key: string]: string} = {
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
    var regex = new RegExp(ch, 'gi');
    text = text.replace(regex, chars[ch]);
  }
  
  return text;
}

/**
 * Converts the text input to "quickmaths" formatted text.
 * For example: This is a test -> becomes italicized.
 * @param {string} text The text to format.
 */
const toQuickMaths: (text: string) => string = text => `_${text.trim().toUpperCase()}_`;

exports.handler = async (event: APIGatewayEvent) => {
  const query = qs.parse(event.body || '').text;
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