let browser = "unsupported"; //Violentmonkey webstore detection
if(navigator.userAgent.includes("Edg/")){
    browser = "newEdge"; //new Edge has a separate webstore
}else if(navigator.userAgent.includes("Chrome/")){
    browser = "chromiumBased"; //chromium based browsers usually use chrome webstore
}else if(navigator.userAgent.includes("Firefox/")){
    browser = "firefox"; //firefox AMO
}

let elem = document.getElementById("dl");
let link = document.getElementById("dl_lnk");
switch(browser){
    case "newEdge":
        elem.src = "https://img.shields.io/badge/download-Violentmonkey-blue?style=for-the-badge";
        link.href = "https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao";
        break;
    case "chromiumBased":
        elem.src = "https://img.shields.io/badge/download-Violentmonkey-blue?style=for-the-badge";
        link.href = "https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag";
        break;
    case "firefox":
        elem.src = "https://img.shields.io/badge/download-Violentmonkey-blue?style=for-the-badge";
        link.href = "https://addons.mozilla.org/firefox/addon/violentmonkey/";
        break;
    case "unsupported":
        elem.src = "https://img.shields.io/badge/unsupported-browser-red?style=for-the-badge";
        break;
}
