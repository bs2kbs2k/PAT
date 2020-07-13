// ==UserScript==
// @name           Pixel Anarchy Tools
// @namespace      pixel_anarchy_tools
// @description    An Image overlay for the site Pixel Anarchy Online to make fixing griefed areas easier
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @version        0.9.0
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
    <h2>Ruler</h2>
    <input id="rulerStart" type="checkbox"> Use ruler
    <br>
    <div id="rulerResult">Dimensions: undefined</div>
    <br>
</div>`);
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<img style="pointer-events: none; position: relative; top: -3240px; left: 0px; opacity: 0.5; image-rendering: pixelated; image-rendering: crisp-edges;" src="" id="overlay">`);
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<canvas width="5760" height="3240" style="pointer-events: none; position: absolute; top: 0px; left: 0px; image-rendering: pixelated; image-rendering: crisp-edges;" id="ruler">`);
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<canvas id="cursor" width="40" height="40" style="display: none;">`);
document.getElementById('logout').insertAdjacentHTML('afterend',`<br> <p style="color: white;">You're using bs2k's script.</p>`);
let pixelCtx = document.getElementById('cursor').getContext('2d');
pixelCtx.strokeStyle = "gray";
pixelCtx.lineWidth = 2;
pixelCtx.fillStyle = "#FFFFFF";
[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
    elem.addEventListener('click',function(e){
	if (window.pixelPreviewEnabled){
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
		document.getElementById("myCanvas").style.cursor = 'url(' + document.getElementById('cursor').toDataURL() + '), auto';
    
		}
	})
})

document.getElementById('cursorColor').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById("myCanvas").style.cursor = "";
    window.pixelPreviewEnabled = true;
    pixelCtx.moveTo(2,2);
    pixelCtx.lineTo(18,20);
    pixelCtx.lineTo(2,26);
    pixelCtx.lineTo(2,1);
    pixelCtx.stroke();
    pixelCtx.fill();
    document.getElementById("myCanvas").style.cursor = 'url(' + document.getElementById('cursor').toDataURL() + '), auto';
  } else {
    document.getElementById("myCanvas").style.cursor = "crosshair";
    window.pixelPreviewEnabled = false;
  }
});

document.getElementById('rulerStart').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById("ruler").style["pointer-events"] = "unset";
    window.isFirstClick = true
  } else {
    document.getElementById("ruler").style["pointer-events"] = "none";
    var c = document.getElementById("ruler");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 5760, 3240);
  }
});

document.getElementById('ruler').addEventListener('click', (event) => {
  coords = document.getElementById('coords').innerText.split(' ')
  event.preventDefault();
  if (window.isFirstClick) {
    window.firstX = coords[2] - 0;
    window.firstY = coords[5] - 0;
    window.isFirstClick = false;
    var c = document.getElementById("ruler");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "gray";
    ctx.fillRect(window.firstX,window.firstY,1,1);
  } else {
    window.secondX = coords[2] - 0;
    window.secondY = coords[5] - 0;
    var c = document.getElementById("ruler");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 5760, 3240);
    document.getElementById("rulerStart").checked = false;
    document.getElementById("rulerResult").innerText = 'Dimensions: '+(Math.abs(window.firstX - window.secondX)+1)+' x '+(Math.abs(window.firstY - window.secondY)+1)
  }
});

//horrible hack(s)
window.secondColor = {style:{}};
window.firstColor = {click:function(){}};

[...document.getElementsByClassName('btnbelow')].forEach(function(elem){
  elem.addEventListener('contextmenu',function(e){
    e.preventDefault();
    window.secondColor.style["border-color"] = 'unset';
    window.secondColor = e.srcElement;
    e.srcElement.style["border-color"] = 'gray';
  })
  elem.addEventListener('click',function(e){
    if (e.isTrusted){
      window.firstColor = e.srcElement;
      window.secondColor.style["border-color"] = 'gray';
    }
  })
})

document.getElementById('myCanvas').addEventListener('contextmenu',function(e){
  e.preventDefault();
  window.secondColor.click();
  window.secondColor.style["border-color"] = 'gray';
  setTimeout(function(){
    window.firstColor.click();
    window.secondColor.style["border-color"] = 'gray';
  },300)
})
