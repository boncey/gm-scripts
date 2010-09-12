// ==UserScript==
// @name           FilmDev Recipe tags on Flickr
// @namespace      http://filmdev.org
// @description	   Link to FilmDev recipe based on a 'filmdev:recipe=xxx' machine tag on Flickr
// @version        1.0
// @identifier	   http://filmdev.org/filmdevrecipetag.user.js
// @date           2008-05-07
// @creator        Darren Greaves (based upon work by Lee Kelleher (lee@vertino.net))
// @include        http://*flickr.com/photos/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2007 Lee Kelleher
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

var getTags = document.getElementsByTagName('a');
var filmdevTest = new RegExp("^filmdev:", "i");
var filmdevTags = new Array();

// helping vars
var splitTag = new Array();
var splitValue = new Array();


// loop through all the machine-tags
for (var i = 0; i < getTags.length; i++)
{
	if (getTags[i].className.indexOf('tag-item') > -1 || getTags[i].className == 'Plain')
	{
		if (filmdevTest.test(getTags[i].innerHTML))
		{
			splitTag = getTags[i].innerHTML.split(":");
			splitValue = splitTag[1].split("=");
			filmdevTags[splitValue[0]] = splitValue[1];
		}
	}
}

if (filmdevTags['recipe'])
{
	pFilmDev = document.createElement('div');
    imgData = "data:image/gif;base64,R0lGODlhEAAQAOYAAP%2F%2F%2F%2F7%2B%2FgAAAOXl5f39%2FQ4ODomJifj4%2BPz8%2FKioqPDw8PLy8szMzEBAQJmZmcXFxZ%2Bfn83NzfHx8QsLC21tbcHBwT4%2BPnd3d11dXWZmZjk5OS0tLVBQUHV1dcjIyCIiIubm5vf396WlpQ0NDd7e3nh4eAICAtPT0%2B7u7piYmPv7%2B%2Bfn5%2FPz86enp6urq0tLS2tra9DQ0Ozs7PT09EZGRtjY2CUlJenp6ampqeTk5GRkZHR0dGFhYUNDQ1dXV%2B%2Fv7zw8PD8%2FP39%2Ff%2Fn5%2BSkpKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAePgACCBIIABAGFiIIoOyIBCAZCQwAtFDcAHhkxDAINADMFJj8ANAIPAAYCDjUTPgAhGx8sADwjJwAQBTgBJDKCKwOICjmEBwMHhcnKy8zNzs%2FQ0dLQAYoA1skLHCWCFy8LAClBEQAVQAkgAjaCRAIDABgCCbgCHRIaOoIwDQoADhYMADzo4QKACgTVql1jFggAOw%3D%3D";
    imgSrc = "<br/><img src=\"" + imgData + "\" alt=\"Development details on FilmDev\" align=\"left\"/>";
    linkFilmDev = "<a href=\"http://filmdev.org/recipe/show/" + filmdevTags['recipe'] + "\" target=\"_blank\" class=\"Plain\">";
	pFilmDev.innerHTML = linkFilmDev + imgSrc + "</a>&nbsp;" + "Development details on " + linkFilmDev + "FilmDev" + "</a>.";
    pFilmDev.className = "Plain";

	
    addlInfo = document.evaluate("//div[@id='photo-sidebar-tags']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (addlInfo == null) {
        addlInfo = document.evaluate("//p[@class='Privacy']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    }
    addlInfo.insertBefore(pFilmDev,addlInfo.childNodes[addlInfo.childNodes.length-1])
    addlInfo.appendChild(pFilmDev);
}
