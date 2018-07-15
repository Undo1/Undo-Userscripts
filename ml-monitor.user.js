// ==UserScript==
// @name FriendlyMods
// @version 01
// @author Undo
// @description Show ML results inline
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/questions*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
    $('document').ready(function(){
        var body = $(".post-text")[0].innerHTML
        var title = $("#question-header .question-hyperlink")[0].innerHTML
        $.get("https://ml.erwaysoftware.com/", { "title": title, "body": body }, function(data) {
            var probOfRecRequest = data["id"][data["class"].indexOf("Recommendation request")];
      
            if (probOfRecRequest > 0.5) {
                $(".inner-content.clearfix").prepend('<span style="background-color: red; padding: 3px; color: white;">recommendation request (' + probOfRecRequest * 100 + '%)</span>')
            } else {
                $(".inner-content.clearfix").prepend('<span style="background-color: green; padding: 3px; color: white;">not-recommendation request (' + probOfRecRequest * 100 + '%)</span>')
            }
        });
		
		return false;
	});
});
