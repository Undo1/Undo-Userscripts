// ==UserScript==
// @name NAA From Search
// @version 0.1
// @author Undo
// @description NAA From Search
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://stackoverflow.com/search*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
	$('document').ready(function(){
	    // var htm=$('.post-menu').html()||"";
	    // if(htm!=-1&&$('[id^=close-question] span').length!=0){
	    //     return;
	    // }
		$('div.stats span.vote-count-post').after($('<a class="naafromsearch" href="javascript:void(0)" title="Flag as NAA">NAA</a>'));
		$('.naafromsearch').bind("click",function(){
			var postidtext=$(this).closest('div.search-result').attr('id').replace('answer-id-','')
			console.log(postidtext)
			$(this).html("<strong>working...</strong>");
			$.post('/flags/posts/'+postidtext+'/add/AnswerNotAnAnswer',
				{'otherText':'','fkey':StackExchange.options.user.fkey},
				function(data){
					console.log(data);
					if (data.Success == true)
					{
						$(".naafromsearch").html("success");
					}
					else
					{
						$('.naafromsearch').html("uh-oh");
					}
				}
			);
		});
		return false;
	});
});