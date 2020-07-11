// ==UserScript==
// @name           Pixel Anarchy Tools
// @namespace      pixel_anarchy_tools
// @description    An Image overlay for the site Pixel Anarchy Online to make fixing griefed areas easier
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        0.4.0
// ==/UserScript==

document.getElementById('brushsize2').parentElement.children[10].insertAdjacentHTML('afterend','<div style="color: white;"> <h2>Opacity</h2> <input type="range" min="1" max="100" value="50" class="slider" id="opacity" onchange="document.getElementById(\'overlay\').style.opacity = document.getElementById(\'opacity\').value/100"> <br> <h2>Overlay URL</h2> <input id="url" style="width: 90%; height: 5%;" autocomplete="off" onchange="document.getElementById(\'overlay\').src = document.getElementById(\'url\').value"> <br> <h2>Overlay Position</h2> <input type="number" maxlength="100" id="x" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="0" step="1" max="5759" onchange="document.getElementById(\'overlay\').style.left = document.getElementById(\'x\').value+\'px\'"> <input type="number" maxlength="100" id="y" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="0" step="1" max="3239" onchange="document.getElementById(\'overlay\').style.top = document.getElementById(\'y\').value-3240+\'px\'"> <br> <h2>Overlay Scale</h2> <input type="number" maxlength="100" id="scale" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="1" onchange="document.getElementById(\'overlay\').style.width = document.getElementById(\'scale\').value+\'px\'"> <br> </div>');
document.getElementById('myCanvas').insertAdjacentHTML('afterend','<img style="pointer-events: none; position: relative; top: -3240px; left: 0px; opacity: 0.5; image-rendering: pixelated; image-rendering: crisp-edges; transform: scale(1);" src="" id="overlay">');
