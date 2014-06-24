// ==UserScript==
// @name Show only unanswered
// @version 1.0
// @author Undo
// @description Show only unanswered questions on the home page
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
	    var htm=$('.post-menu').html()||"";
	    if(htm!=-1&&$('[id^=close-question] span').length!=0){
	        return;
	    }
	    var isShowingCheckboxes = false;
		$('div#tabs').append($('<a href="javascript:void(0)" title="Show only questions with no answers" class="show-only-unananswered">unanswered</a>'));
		$('.show-only-unananswered').bind("click",function(){
			$(this).css("background", "#fff")
			$(this).css("border", "1px solid #ccc")
			$(this).css("border-bottom-color", "#fff")
			$(".status.answered").parent().parent().remove(); $(".status.answered-accepted").parent().parent().remove()
			return false;
		});
	});
});
