/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

define(['text!../_locales/en/messages.json'], function (messageJson) {
  var messages = JSON.parse(messageJson);

  // this is the getMessage() function
  // key: string representing the key to translate
  return function (key) {
    var translation = messages[key];

    if (translation) {
      return translation.message;
    }
    else {
      // no translation for key
      return '!!key';
    }
  };
});
