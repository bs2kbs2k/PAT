// ==UserScript==
// @name           Pixel Anarchy Tools
// @namespace      pixel_anarchy_tools
// @description    An Image overlay for the site Pixel Anarchy Online to make fixing griefed areas easier
// @include        http://*.pixelanarchy.online/*
// @include        https://pixelanarchy.online/*
// @match          http://pixelanarchy.online/*
// @match          https://pixelanarchy.online/*
// @author         bs2k
// @version        0.12.1
// ==/UserScript==


//Inserts the controls
document.getElementById('overlaysummary').parentElement.parentElement.insertAdjacentHTML('afterend',`
<br>
<details style="color: white;">
    <summary id="scriptsummary" style="outline: none;">Script Options</summary>
    <h2>Chat Height</h2>
    <input type="number" maxlength="100" id="height" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="1" onchange="document.getElementById('messages').style.height = document.getElementById('height').value+'px'">
    <br>
    <h2>Cursor Color</h2>
    <input id="cursorColor" type="checkbox"> Selected color
    <br>
    <h2>Ruler</h2>
    <input id="rulerStart" type="checkbox"> Use ruler
    <br>
    <div id="rulerResult">Dimensions: undefined</div>
    <br>
    <h2>Palette Switch</h2>
    <input id="paletteSwitch" type="checkbox"> Arrow keys
    <br>
</details>`);

//Inject additional overlay features
document.getElementById('scaleImg').previousElementSibling.remove() //remove scale slider(1)
document.getElementById('scaleImg').insertAdjacentHTML('afterend',`
<h2>Width</h2>
<input type="number" maxlength="100" id="scale" style="width: 90%; height: 5%;" autocomplete="off" min="0" value="1" onchange="document.getElementById('overlay').style.width = document.getElementById('scale').value+'px'">
<br>
<h2>Mode</h2>
<input id="difference" type="checkbox" onchange="document.getElementById('overlay').style['mix-blend-mode'] = document.getElementById('difference').checked ? 'difference':'unset'"> Difference blend
<br>
<h2>Opacity Animation</h2>
<input id="opacityFade" type="checkbox" onchange="document.getElementById('overlay').style['animation'] = document.getElementById('opacityFade').checked ? '2s fade infinite linear':'unset'"> Fade animation
`);
document.getElementById('scaleImg').remove() //remove scale slider(2)

//Inject sidebar toggle
document.getElementById('sidenav').insertAdjacentHTML('afterend',`
<div id="center" style="width: 250px; overflow: visible; height: 50px; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; transition: all 1s;">
    <svg width="15" height="50" style="float: right; position: relative; left: 15px; z-index: 999;" id="toggle">
        <rect x="0" y="0" width="15" height="50" style="fill:#2e2c2c;" rx="5" ry="5" />
        <rect x="0" y="-10" width="10" height="100" style="fill:#2e2c2c;" rx="5" ry="5" />
        <polygon points="10,20 10,30 4,25" style="fill:#fff;"/>
    </svg>
</div>
`);
document.getElementById('sidenav').style.transition = "all 1s";
document.getElementsByClassName('pallete')[0].style.transition = "all 1s";

//Inject ruler canvas
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<canvas width="5760" height="3240" style="pointer-events: none; position: absolute; top: 0px; left: 0px; image-rendering: pixelated; image-rendering: crisp-edges;" id="ruler">`);

//Insert cursor canvas
document.getElementById('myCanvas').insertAdjacentHTML('afterend',`<canvas id="cursor" width="40" height="40" style="display: none;">`);

//Insert version notice
document.getElementById('logout').insertAdjacentHTML('afterend',`<br> <p style="color: white;">You're using bs2k's script.</p>`);
let pixelCtx = document.getElementById('cursor').getContext('2d');

//cursor color(stolen from Budsterblue's script)
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

//ruler
//ruler checkbox
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

//ruler onclick
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
    document.getElementById("ruler").style["pointer-events"] = "none";
    document.getElementById("rulerResult").innerText = 'Dimensions: '+(Math.abs(window.firstX - window.secondX)+1)+' x '+(Math.abs(window.firstY - window.secondY)+1)
  }
});

//secondary color
//TODO better solution
window.secondColor = {style:{}};
window.firstColor = {click:function(){}};

//set secondary color
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

//use secondary color
document.getElementById('myCanvas').addEventListener('contextmenu',function(e){
  e.preventDefault();
  window.secondColor.click();
  window.secondColor.style["border-color"] = 'gray';
  setTimeout(function(){
    window.firstColor.click();
    window.secondColor.style["border-color"] = 'gray';
  },300)
})

//sidebar toggle
window.sidebarShown = true;
document.getElementById('toggle').addEventListener('click',function(e){
  if(window.sidebarShown){
    document.getElementById('sidenav').style.left = "-250px";
    document.getElementsByClassName('pallete')[0].style["margin-left"] = "0";
    document.getElementById('center').style.left = "-250px";
    window.sidebarShown = false;
  } else {
    document.getElementById('sidenav').style.left = "0";
    document.getElementsByClassName('pallete')[0].style["margin-left"] = "250px";
    document.getElementById('center').style.left = "0";
    window.sidebarShown = true;
  }
});

//Opacity Fade
//https://stackoverflow.com/a/33176845/13016663
function GM_addStyle(css) {
  const style = document.getElementById("GM_addStyleBy8626") || (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "GM_addStyleBy8626";
    document.head.appendChild(style);
    return style;
  })();
  const sheet = style.sheet;
  sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

GM_addStyle(`
@keyframes fade{
  0%{
    opacity: 0.3;
  }
  50%{
    opacity: 0.8;
  }
  100%{
    opacity: 0.3;
  }
}
`);

//URL placeholder(from budsterblue's script)
document.getElementById("urlSelector").placeholder = "https://example.com/image.png";

//Pallete switch(also from budsterblue)
document.getElementById('myCanvas').setAttribute('tabindex',0)
window.palleteIndex = 0;
document.getElementById('myCanvas').addEventListener ("keydown", function (e) {
	if (document.getElementById('paletteSwitch').checked) {
    		if (e.which === 37) {
			e.preventDefault();
			if (window.palleteIndex == 0) { window.palleteIndex = 28; }
			else { window.palleteIndex -= 1; }
			document.getElementsByClassName('btnbelow')[window.palleteIndex].click();
    		} else if (e.which == 39) {
			e.preventDefault();
			if (window.palleteIndex == 28) { window.palleteIndex = 0; }
			else { window.palleteIndex += 1; }
			document.getElementsByClassName('btnbelow')[window.palleteIndex].click();
		}
	}
} );

//grid svgshare quota workaround
setTimeout(function(){
  document.getElementsByClassName('grid')[0].src = 'https://github.com/bs2kbs2k/PAT/raw/master/grid.svg'
}, 1500);
