// ==UserScript==
// @name Mod button on right
// @version 1.0
// @author Undo
// @description Move the mod button to the right of all the other buttons
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include http://*stackoverflow.com/*
// @include http://*superuser.com/*
// @include http://*serverfault.com/*
// @include http://*stackexchange.com/*
// @include http://discuss.area51.com/*
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
    $('[id*="t-m"]').map(function(i,e){$(e).parent().append(e)})
  });
});
