// ==UserScript==
// @name Candlewax
// @version 1.0.1
// @author Undo
// @description Unlink PII
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
	$(document).ajaxComplete(function() {
    field = $("a[href^=mailto]");
    field.parent().html(field.html());
		return false;
	});
});
