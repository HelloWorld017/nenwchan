(function(){
	var clearList = [];
	var main = $('main');
	$(document).ready(function(){
		$('.main-section').parallax({
			imageSrc: './resources/image/parallax-service.jpg',
			naturalWidth: 3840,
			naturalHeight: 2769
		});
		clearList.push('.main-section');

		['web', 'telegram', 'deprecated'].forEach(function(v, k){
			$('#' + v).parallax({
				imageSrc: './resources/image/parallax-service' + (k + 1) +'.jpg'
			});
			clearList.push('#' + v);
		});

		main.on('scroll', function(){
			$(window).trigger('resize').trigger('scroll');
		});

		$('a[data-href]').click(function(e){
			main.animate({
				scrollTop: main.scrollTop() + $($(this).attr('data-href')).position().top
			}, 300);
			return false;
		});
	});

	$(document).on('turbolinks:before-cache', function(){
		clearList.forEach((v) => {
			$(v).parallax('destroy');
		});

		$('a[data-href]').off('click');
		$('main').off('scroll');
		$(document).off('turbolinks:before-cache');
	});
})();