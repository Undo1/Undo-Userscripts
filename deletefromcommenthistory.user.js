// ==UserScript==
// @name Delete comments from comment history
// @version 0.2
// @author Undo
// @description To delete stuff faster
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include *://*stackoverflow.com/admin/users/*/post-comments*
// @include *://*superuser.com/admin/users/*/post-comments*
// @include *://*serverfault.com/admin/users/*/post-comments*
// @include *://*stackexchange.com/admin/users/*/post-comments*
// @include *://discuss.area51.com/admin/users/*/post-comments*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
	$('document').ready(function(){
		$('.meta-row .creation-date').each( function(){
			if ($($(".meta-row .creation-date")[0].closest('tr.meta-row')).hasClass("deleted-row") == false){
			$(this).append($('<span class="lsep">|</span><a class="delete-comment" href="javascript:void(0)" title="Delete comment">(delete)</a>'));
		}else{
			$(this).append($('<span class="lsep">|</span><a class="delete-comment" href="javascript:void(0)" title="Delete comment">(undelete)</a>'));
		}}
		);
		$('.delete-comment').bind("click",function(){
      var deleteButton = $(this)
			var commentid=$(this).closest('tr.meta-row').data('id');
      console.log(commentid)
			var postid = $(this).closest('tr.meta-row').data('postid');
      console.log(postid)

			if ($(this).closest('tr.meta-row').hasClass("deleted-row") == true){
				var url = "/admin/posts/" + postid + "/comments/" + commentid + "/undelete"
				$(this).html("<strong>(working...)</strong>");
				$.post(url,
					{'fkey':StackExchange.options.user.fkey, 'sendCommentBackInMessage':'true'},
					function(data){
							deleteButton.html("(delete)");
							deleteButton.closest('tr.meta-row').removeClass('deleted-row')
						}
				);
			}else{
				var url = '/posts/comments/'+commentid+'/vote/10'
				$.post(url,
					{'fkey':StackExchange.options.user.fkey, 'sendCommentBackInMessage':'true'},
					function(data){
						console.log(data);
						if (data.Success == true)
						{
							deleteButton.html("(undelete)");
							deleteButton.closest('tr.meta-row').addClass('deleted-row')
						}
					}
				);
				$(this).html("<strong>(working...)</strong>");
			}
		});
		return false;
	});
});
