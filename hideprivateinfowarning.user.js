// ==UserScript==
// @name Hide private info warning
// @version 1.0
// @author Undo
// @description Hides the warning on the new user page
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/users/*
// @include http://*superuser.com/users/*
// @include http://*serverfault.com/users/*
// @include http://*stackexchange.com/users/*
// @include http://discuss.area51.com/users/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
  $('document').ready(function(){
    $("div.system-alert:contains('information on this page might be private')").remove()
	  return false;
  });
});
