// ==UserScript==
// @name OT8 fast!
// @version 1.0
// @author Undo
// @description To close things
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://stackoverflow.com/*
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
		$('.question .post-menu').append($('<span class="lsep">|</span><a class="ot8" href="javascript:void(0)" title="Close as software rec request">srr</a>'));
		$('.ot8').bind("click",function(){

			var postid=$(this).closest('div.question,div[id^=answer]').data('questionid')||$(this).closest('div.question,div[id^=answer]').data('answerid');
			$(this).html("<strong>working...</strong>");
			$.post('/flags/questions/'+postid+'/close/add',
				{'closeReasonId':'OffTopic','duplicateOfQuestionId':'','closeAsOffTopicReasonId':'8','offTopicOtherText':'This question appears to be off-topic because it is about','offTopicOtherCommentId':'','originalOffTopicOtherText':'This question appears to be off-topic because it is about','fkey':StackExchange.options.user.fkey},
				function(data){
					console.log(data);
					if (data.Success == true)
					{
						if (data.Count == 5)
						{
							location.reload()
						}
						$(".ot8").html("success");
						$(".close-question-link").html("close (" + data.Count + ")");
						$(".ot8").remove();
					}
				}
			);
		});
		return false;
	});
});