/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

(function() {


// Get a localized display string.
// The default implemnetation just returns back the given lookup key, but
// if the chrome.i18n API is avaialble is used.  Failing that, if a chrome-style
// messages.json file exists, that is used with a minimal implementation of
// the chrome API.

window.getMessage = undefined;


// A helper function to set the text on an element without destroying the existing 
// contents of that element.  Will reuse the first text node child if it exists.

window.setNodeText = function (elem, msgStr)
{
    var substituted = false;
    var child = elem.firstChild;
    while (child) {
        if (child.nodeType == Node.TEXT_NODE) {
            child.nodeValue = msgStr;
            substituted = true;
            break;
        }
        else {
            child = child.nextSibling;
        }
    }
    if (!substituted) {
        var textNode = document.createTextNode(msgStr);
        elem.appendChild(textNode);
    }
}


// For backwards compatibility with older versions of the API

window.initGetMessage = window.initGetMessage || Function("return;");
window.initStaticStrings = window.initStaticStrings ||  Function("return;");

///////////////////////////////////////////////////////////////////////////////
// private below here

var messages;
var isDone = false;
function initGetMessage (doneCallback)
{
    var isCallable = doneCallback instanceof Function;
    if (window.getMessage) {
        isCallable && doneCallback();
    }
    else if (window.chrome && window.chrome.i18n && window.chrome.i18n.getMessage) {
        window.getMessage = chrome.i18n.getMessage;
        isCallable && doneCallback();
    }
    else {
        var request = new XMLHttpRequest();
        var path = "_locales/en/messages.json";  // TODO: choose locale correctly
        request.open("GET", path);
        request.onreadystatechange = function (event) {
            var state = event.target.readyState;
            if (4 == state) {
                var requestStr = request.responseText;
                try {
	            messages = JSON.parse(requestStr);
                    window.getMessage = fallbackGetMessage;
                }
                catch(err) {
	            console.log("Unable to read fallback messages from " + path);
                    window.getMessage = errorGetMessage;
                }
                isCallable && doneCallback();
            }
        };
        request.send();
    }
}

function errorGetMessage (key, args)
{
    var msgStr = "!!" + key;

    var substitutions;
    if (args === undefined) {
        substitutions = [];
    }
    else if (args instanceof Array === false) {
        substitutions = [args];
    }
    else {
        substitutions = args;
    }

    msgStr += (" " + substitutions.join(" "));
    return msgStr;
}

function fallbackGetMessage (key, args)
{
    var msgStr = "";
    if (key in messages) {
        var msgData = messages[key];
        if ("message" in msgData) {
            msgStr = msgData.message;
        }
    }

    var substitutions;
    if (args === undefined) {
        substitutions = [];
    }
    else if (args instanceof Array === false) {
        substitutions = [args];
    }
    else {
        substitutions = args;
    }

    // This simple routine just substitutes args in order
    // Does not use the "contents" value.
    var matches; 
    do {
        matches = msgStr.match(/\$([0-9]+)/);
        if (matches) {
            var argNum = matches[1] - 1;
            var newStr = (argNum in substitutions) ? substitutions[argNum] : "<null>";  //TODO should be ""?
            msgStr = msgStr.replace(matches[0], newStr);
        }
    } while (matches);

    msgStr = msgStr.replace(/\$\$/g, "$");
    return msgStr;
}

function initStaticStrings ()
{
    if (window.getMessage) {
        var elemList = document.querySelectorAll(".i18n");
        var numElems = elemList.length;
        var elem;
        for (var i = 0; i < numElems; ++i) {
            elem = elemList[i];
            if (elem.id) {
                var msgStr = window.getMessage(elem.id);
                setNodeText(elem, msgStr);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", initStaticStrings, false);
initGetMessage(initStaticStrings);

})();
