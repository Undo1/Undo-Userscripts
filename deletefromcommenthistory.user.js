// ==UserScript==
// @name Delete comments from comment history
// @version 0.1
// @author Undo
// @description To delete stuff faster
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include http://*stackoverflow.com/admin/users/*/post-comments
// @include http://*superuser.com/admin/users/*/post-comments
// @include http://*serverfault.com/admin/users/*/post-comments
// @include http://*stackexchange.com/admin/users/*/post-comments
// @include http://discuss.area51.com/admin/users/*/post-comments
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
	$('document').ready(function(){
		$('.meta-row .creation-date').append($('<span class="lsep">|</span><a class="delete-comment" href="javascript:void(0)" title="Delete comment">(delete)</a>'));
		$('.delete-comment').bind("click",function(){
      var deleteButton = $(this)
			var commentid=$(this).closest('tr.meta-row').data('id');
      console.log(commentid)

			$(this).html("<strong>(working...)</strong>");
			$.post('/posts/comments/'+commentid+'/vote/10',
				{'fkey':StackExchange.options.user.fkey, 'sendCommentBackInMessage':'true'},
				function(data){
					console.log(data);
					if (data.Success == true)
					{
						deleteButton.html("<strong>deleted</strong>");
            deleteButton.closest('tr.meta-row').addClass('deleted-row')
					}
				}
			);
		});
		return false;
	});
});
