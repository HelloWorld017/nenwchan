$(document).ready(function(){
	//$(document).pjax('a[data-pjax]', 'body');

	var oCover = document.createElement("div");
	oCover.id = "ajax-cover";
	var oLoadingBox = document.createElement("div");
	oLoadingBox.id = "ajax-loader";
	oLoadingBox.appendChild(oCover);
	var oLoadingImg;

	$(document).on('turbolinks:request-start', function(){
		if(typeof oLoadingImg !== 'undefined') oCover.removeChild(oLoadingImg);
		oLoadingImg = new Image();
		oLoadingImg.id = "ajax-loading";
		oLoadingImg.src = "/loading?v=" + Math.random().toString(36);
		oCover.appendChild(oLoadingImg);
		document.body.appendChild(oLoadingBox);
	});

	$(document).on('turbolinks:request-end', function(){
		document.body.removeChild(oLoadingBox);
	});

	/*$(document).on('pjax:timeout', function(event){
		event.preventDefault();
	});*/
});
