"use strict";
//Original source from https://github.com/giabao/mdn-ajax-nav-example
var ajaxRequest = new (function(){
	function closeReq(){
		oLoadingBox.parentNode && document.body.removeChild(oLoadingBox);
		bIsLoading = false;
	}

	function abortReq(){
		if (!bIsLoading) return;
		oReq.abort();
		closeReq();
	}

	function ajaxError(){
		location.href = oPageInfo.url.replace("pjax", "");
	}

	function ajaxLoad(){
		var result = JSON.parse(this.responseText);
		document.body.innerHTML = result.content;
		oPageInfo = {
			title: result.title,
			url: result.url
		};

		if(bUpdateURL){
			history.pushState(oPageInfo, oPageInfo.title, oPageInfo.url);
			bUpdateURL = false;
		}
		closeReq();
	}

	function filterURL(sURL, sViewMode){
		return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");
	}

	function getPage(sPage){
		if (bIsLoading) return;
		oReq = new XMLHttpRequest();
		bIsLoading = true;
		oReq.onload = ajaxLoad;
		oReq.onerror = ajaxError;
		if(sPage)  oPageInfo.url = filterURL(sPage, null);
		oReq.open("get", filterURL(oPageInfo.url, "json"), true);
		oReq.send();
		oLoadingBox.parentNode || document.body.appendChild(oLoadingBox);
	}

	function requestPage(sURL){
		if(history.pushState){
			bUpdateURL = true;
			getPage(sURL);
		}else location.href = sURL.replace("pjax", "");
	}

	function init(){
		document.querySelectorAll('a[data-load]').onclick = function(){
			requestPage(this.getAttribute("data-load"));
			return false;
		}
	}

	var rSearch = /\?.*$/;
	var rHost = /^[^\?]*\?*&*/;
	var rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i");
	var rEndQstMark = /\?$/;
	oPageInfo = {
		title: null,
		url: location.href
	}

	var oReq, bIsLoading = false, bUpdateURL = false;

	var oLoadingBox = document.createElement("div");
	var oCover = document.createElement("div");
	var oAbort = document.createElement("a");
	var oLoadingImg = new Image();

	oAbort.id = "ajax-abort";
	oAbort.onclick = function(){
		abortReq();
		return false;
	};
	oLoadingImg.id = "ajax-loading";
	oLoadingImg.src = "/resources/image/load-animation.svg";
	oCover.id = "ajax-cover";
	oCover.appendChild(oLoadingImg);
	oCover.appendChild(oAbort);
	oLoadingBox.id = "ajax-loader";
	oLoadingBox.appendChild(oCover);

	onpopstate = function(oEvent){
		bUpdateURL = false;
		oPageInfo.title = oEvent.state.title;
		oPageInfo.url = oEvent.state.url;
		getPage();
	};

	window.addEventListener ? addEventListener("load", init, false) : window.attachEvent ? attachEvent("onload", init) : (onload = init);

	// Public methods

	this.open = requestPage;
	this.stop = abortReq;
	this.rebuildLinks = init;
})();
