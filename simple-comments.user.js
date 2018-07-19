// ==UserScript==
// @name Simple comments
// @version 1.0
// @author Undo
// @description Hide upvote/flag icons except on mouseover
// @license CC0
// @include       http*://stackoverflow.com/*
// @include       http*://meta.stackoverflow.com/*
// @include       http*://dev.stackoverflow.com/*
// @include       http*://askubuntu.com/*
// @include       http*://meta.askubuntu.com/*
// @include       http*://superuser.com/*
// @include       http*://meta.superuser.com/*
// @include       http*://serverfault.com/*
// @include       http*://meta.serverfault.com/*
// @include       http*://mathoverflow.net/*
// @include       http*://meta.mathoverflow.net/*
// @include       http*://*.stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
  $('document').ready(function(){
    var pre_str = ".comments-list .comment.js-comment .js-comment-actions.comment-actions";
    var pre_str_hover = ".comments-list .comment.js-comment:hover .js-comment-actions.comment-actions";
    // Some voodoo magic from someone. I have no idea what this does.
    $("body").append("<style>" +
                     pre_str+" .comment-up-off, "+pre_str+" .comment-flagging .comment-flag { visibility: hidden !important; }"+
                     pre_str_hover+" .comment-up-off, "+pre_str_hover+" .comment-flagging .comment-flag { visibility: initial !important; }"+
                     "</style>")
  });
});
