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
    // Some voodoo magic from someone. I have no idea what this does.
    $("body").append("<style>.comment-up-off,.comment-flagging { display: none; } .comment:hover .comment-up-off, .comment:hover .comment-flagging { display: block; }</style>")
  });
});
