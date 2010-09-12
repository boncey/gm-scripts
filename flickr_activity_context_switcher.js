// ==UserScript==
// @name          Flickr Activity Context Switcher
// @namespace     http://github.com/jufemaiz/jmc_flickr_gm_flickr-activity-context
// @description   Removes the activity stream context from activity pages (returns browsing of images to user only context)
// @include       http://*flickr.com/
// @include		  http://*flickr.com/photos/friends/
// @include		  http://*flickr.com/*/favorites/*
//
// ==/UserScript==
//

var main = document.getElementById('Main');
if (main == null) {
    console.log("Matched main");
    main = document.getElementById('faves');
}
var elements = main.getElementsByTagName('a');

for(var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if(el.href.indexOf("/in/contacts/") != -1) {
		el.href = el.href.replace("/in/contacts/","");
	}
    if(el.href.indexOf("/in/faves-") != -1) {
        console.log("Matched " + el.href);
		el.href = el.href.replace(/\/in\/faves-.+/,"");
	}
	
}
