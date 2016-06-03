// ==UserScript==
// @name Flag timing warning
// @version 0.1
// @author Undo
// @description Warns when the post has been edited after flags were cast
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include *://*stackoverflow.com/admin/dashboar*
// @include *://*superuser.com/admin/dashboar*
// @include *://*serverfault.com/admin/dashboar*
// @include *://*stackexchange.com/admin/dashboar*
// @include *://discuss.area51.com/admin/dashboar*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($) {
	$('document').ready(function() {
    var postsToCheck = $.map($(".flagged-post-row"), function(val, i) {
      return $(val).data("post-id")
    }).join(";");

    $.get("https://api.stackexchange.com/2.2/posts/" + postsToCheck + "/revisions", {key: "FgWOIKMLFEJQ86U3hbkgDA((", site: window.location.hostname, pagesize: 100, filter: "!*Kb37YAWvnLZdFd."}).done(function(data) {
      $.each(data["items"], function(index, revision) {
        $.each($("#flagged-" + revision["post_id"] + " .mod-message .relativetime"), function(index, timestamp) {
          var flagDate = Date.parse($(timestamp).attr("title")) / 1000;
          if (flagDate < revision["creation_date"])
          {
            $("#flagged-" + revision["post_id"] + " .mod-message tbody ").prepend("<tr><td class='flagcell'>&nbsp;</td><td><p style='color:red'><strong><a target='_blank' style='color:red' href='/posts/" + revision["post_id"] + "/revisions'>Post revised</a></strong> since first flag cast</p></td></tr>")
            return false;
          }
        });
      });
    });
  });
});
