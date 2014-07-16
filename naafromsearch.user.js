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

		var postids = []

	    window.setInterval(function(){
	    	var postid = postids.pop()
	    	if (postid != undefined)
	    	{
	    		console.log("flagging " + postid)
				$(this).html("<strong>working...</strong>");
				$.post('/flags/posts/'+postid+'/add/AnswerNotAnAnswer',
					{'otherText':'','fkey':StackExchange.options.user.fkey},
					function(data){
						console.log(data);
					}
				);
				console.log(postids.length + " posts left")
	    	}
		}, 7000);

		$('div.stats span.vote-count-post').after($('<a class="naafromsearch" href="javascript:void(0)" title="Flag as NAA">NAA</a>'));
		$('.naafromsearch').bind("click",function(){
			var thing = $(this)
			var postidtext=$(this).closest('div.search-result').attr('id').replace('answer-id-','')
			postids.push(postidtext)
			thing.html("added to list")
		});
		return false;
	});
});