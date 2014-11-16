// ==UserScript==
// @name Find and Replace
// @version 0.1
// @author Undo
// @description Find and replace things when editing SE posts
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

    $(".edit-post").bind("click", function() {
      var checkExist = setInterval(function() {
         if ($('.cancel-edit').length) {
            clearInterval(checkExist);

            $('.form-submit.cbt').append('<a href="javascript:void(0)" class="find-and-replace" style="margin-left: 8px;">find/replace</a>');

            $('.find-and-replace').bind('click', function(){
                var findReplaceButton = $(this)

                $('.form-submit.cbt').append('replace <input type="text" class="find-replace-find" maxlength="300" size="60" name="" style="width: 100px" data-max-length="300"> with <input type="text" class="find-replace-replace" maxlength="300" size="60" name="" style="width: 100px;" data-max-length="300"> <a href="javascript:void(0)" class="go-find-replace"> go</a>')

                $(this).text("")

                $(".go-find-replace").bind("click", function() {
                  var find = $(".find-replace-find").val()
                  var replace =  $(".find-replace-replace").val()
                  $(".wmd-input").text($(".wmd-input").text().replace(find,replace))
                })
            })
         }
      }, 100); // check every 100ms
    })
		return false;
	});
});
