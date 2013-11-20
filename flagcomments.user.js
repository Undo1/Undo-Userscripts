// ==UserScript==
// @name Comment purge
// @version 1.0.1
// @author Undo (with help from @ManishEarth)
// @description Quick & easy comment flagging
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
	$('.post-menu').append($('<span class="lsep">|</span><a class="purge" href="javascript:void(0)" title="Flag obsolete comments">autoflag</a>'));
	$('.purge').bind("click",function(){

	// var postid=$(this).closest('div.question,div[id^=answer]').data('questionid')||$(this).closest('div.question,div[id^=answer]').data('answerid');
	// $.post('/flags/posts/'+postid+'/add/PostOther',{'otherText':'obsolete comments',
	// 'fromToolsQueue':'false',
	// 'target-post-id':postid,
	// 'fkey':StackExchange.options.user.fkey});
	if (isShowingCheckboxes == false)
	{
		$(this).html("<strong>confirm</strong>");
		$('.comment').prepend("<input type='checkbox' class='autoflag_checkbox'>");
	}
	else
	{
		var checked = $('input:checked');
		console.log(checked.length);
		var flaggedcomments=$('.autoflag_checkbox:checked').map(function(){return $(this).parent().attr('id').replace(/comment-/g, "")}).toArray()
		function flagnext(){
			console.log(flaggedcomments);
			var obj=flaggedcomments.pop();
			//var ids = $(obj).parent();
			//console.log(ids.attr("id").replace(/comment-/g, ""));
			$.post('/flags/comments/'+obj+'/add/22',
				{'otherText':'','fkey':StackExchange.options.user.fkey},
				function(){
					console.log("response recieved");
					if(flaggedcomments.length>0){
						setTimeout(flagnext,5010);
					}
				}
			);
			
		}
		flagnext();
/*		$('.autoflag_checkbox:checked').each(function(i, obj) {
    		var ids = $(obj).parent();
    		console.log(ids.attr("id").replace(/comment-/g, ""));
    		setTimeout(function(){$.post('/flags/comments/'+ids.attr("id").replace(/comment-/g, "")+'/add/22',{'otherText':'',
		'fkey':StackExchange.options.user.fkey}); console.log("comment flagged")}, 5000 * i);
		});
*/
		$(".autoflag_checkbox").remove();
		// $(this).html("<strong>0/" + checked.length + "...</strong>");

		// var postid=$(this).closest('tr .comment');
		// $.delay(1000);
		// $(this).html("<strong>1/" + checked.length + "...</strong>");
	}
	isShowingCheckboxes = !isShowingCheckboxes;
	return false;
});
});
});
