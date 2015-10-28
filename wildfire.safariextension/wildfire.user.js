// ==UserScript==
// @name wildfire 
// @version 1.0
// @author Undo
// @description Send things to Wildfire
// @license CC0
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
    $('.post-menu').append($('<span class="lsep">|</span><a class="wildfire" href="javascript:void(0)" title="Flag things with Wildfire">wildfire</a>'));

    $('.wildfire').bind("click",function(){
      console.log("oy");
      if (isShowingCheckboxes == false)
      {
        isShowingCheckboxes = true;
        $(this).html("<strong>confirm</strong>");
        var post = $(this).closest(".answer, .question");
        $('.comment').each( function() {
          if ($(this).closest(".answer, .question").is(post))
          {
            $(this).prepend("<input type='checkbox' class='autoflag_checkbox' checked>");
          }
          else
          {
            $(this).prepend("<input type='checkbox' class='autoflag_checkbox'>");
          }
        });
      }
      else
      {
        $(this).html("<strong>working...</strong>");

        var checked = $('input:checked');
        console.log(checked.length);
        var flaggedcomments=$('.autoflag_checkbox:checked').map(function(){return $(this).parent().attr('id').replace(/comment-/g, "")}).toArray()
        
        console.log(flaggedcomments);

        $.ajax({ url: "http://wildfire.erwaysoftware.com/flags/userscript-new",
                 type: 'POST',
                 crossDomain: true,
                 'data': {
                   'comment_ids': flaggedcomments.join(","),
                   'flag_type': 'obsolete'
                 },
                 success: function(response) {
                   $(".wildfire").html(response)
                 },
                 xhrFields: {
                   withCredentials: true
                 } });

        $(".autoflag_checkbox").remove();
        isShowingCheckboxes = !isShowingCheckboxes;
        return false;
      }
  });
});
});
