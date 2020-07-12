// ==UserScript==
// @name           Pixel Anarchy Tools
// @namespace      pixel_anarchy_tools
// @description    An Image overlay for the site Pixel Anarchy Online to make fixing griefed areas easier
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        0.6.2
// ==/UserScript==

document.getElementById('brushsize2').parentElement.children[10].insertAdjacentHTML('afterend',`
<div style="color: white;">
    <h2>Chat Height</h2>
    <input type="number" maxlength="100" id="height" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="1" onchange="document.getElementById('messages').style.height = document.getElementById('height').value+'px'">
    <h2>Overlay Opacity</h2>
    <input type="range" min="1" max="100" value="50" class="slider" id="opacity" onchange="document.getElementById('overlay').style.opacity = document.getElementById('opacity').value/100">
    <br>
    <h2>Overlay Image</h2>
    <input id="url" style="width: 90%; height: 5%;" autocomplete="off" onchange="document.getElementById('overlay').src = document.getElementById('url').value">
    <input type="file" id="file" style="width: 90%; height: 5%;" accept="image/*" onchange="document.getElementById('overlay').src = window.URL.createObjectURL(document.getElementById('file').files[0])">
    <br>
    <h2>Overlay Position</h2>
    <input type="number" maxlength="100" id="x" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="0" step="1" max="5759" onchange="document.getElementById('overlay').style.left = document.getElementById('x').value+'px'">
    <input type="number" maxlength="100" id="y" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="0" step="1" max="3239" onchange="document.getElementById('overlay').style.top = document.getElementById('y').value-3240+'px'">
    <br>
    <h2>Overlay Width</h2>
    <input type="number" maxlength="100" id="scale" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="1" onchange="document.getElementById('overlay').style.width = document.getElementById('scale').value+'px'">
    <br>
    <h2>Overlay Mode</h2>
    <input id="difference" type="checkbox" onchange="document.getElementById('overlay').style['mix-blend-mode'] = document.getElementById('difference').checked ? 'difference':'unset'"> Difference blend
    <br>
    <h2>Cursor Color</h2>
    <input id="cursorColor" type="checkbox"> Selected color
    <br>
</div>`);
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<img style="pointer-events: none; position: relative; top: -3240px; left: 0px; opacity: 0.5; image-rendering: pixelated; image-rendering: crisp-edges;" src="" id="overlay">`);
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<canvas id="cursor" width="40" height="40" style="display: none;">`);
let pixelCtx = document.getElementById('cursor').getContext('2d');
pixelCtx.strokeStyle = "gray";
pixelCtx.lineWidth = 2;
pixelCtx.fillStyle = "#FFFFFF";
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
	if (pixelPreviewEnabled){
		if (e.srcElement.id == "mix"){
			var gradient = pixelCtx.createLinearGradient(0, 0, 30, 0);
			gradient.addColorStop(0, 'red');
			gradient.addColorStop(1 / 6, 'orange');
			gradient.addColorStop(2 / 6, 'yellow');
			gradient.addColorStop(3 / 6, 'green');
			gradient.addColorStop(4 / 6, 'blue');
			gradient.addColorStop(5 / 6, 'indigo');
			gradient.addColorStop(1, 'violet');
			pixelCtx.fillStyle = gradient;
		} else{
			pixelCtx.fillStyle = e.srcElement.id;
		}
		pixelCtx.moveTo(2,2);
		pixelCtx.lineTo(18,20);
		pixelCtx.lineTo(2,26);
		pixelCtx.lineTo(2,1);
		pixelCtx.stroke();
		pixelCtx.fill();
		document.getElementById("myCanvas").style.cursor = 'url(' + pixelPreviewCanvas.toDataURL() + '), auto';
    
		}
	})
})

pixelPreview.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById("myCanvas").style.cursor = "";
    pixelPreviewEnabled = true;
    pixelCtx.moveTo(2,2);
    pixelCtx.lineTo(18,20);
    pixelCtx.lineTo(2,26);
    pixelCtx.lineTo(2,1);
    pixelCtx.stroke();
    pixelCtx.fill();
    document.getElementById("myCanvas").style.cursor = 'url(' + pixelPreviewCanvas.toDataURL() + '), auto';
  } else {
    document.getElementById("myCanvas").style.cursor = "crosshair";
    pixelPreviewEnabled = false;
  }
});
