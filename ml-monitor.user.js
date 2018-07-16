// ==UserScript==
// @name MLViewer
// @version 01
// @author Undo
// @description Show ML results inline
// @license MIT
// @include *://stackoverflow.com/questions*
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
        $.get("https://ml.erwaysoftware.com/", { "body": body }, function(data) {
      
            if (data["prediction"] == "Recommendation request") {
                $(".inner-content.clearfix").prepend('<span style="background-color: red; padding: 3px; color: white;">ML: recommendation request</span>')
            } else {
                $(".inner-content.clearfix").prepend('<span style="background-color: green; padding: 3px; color: white;">ML: not-recommendation request</span>')
            }
        });
	    return false;
    });
});

