(function(){
	var clearList = [];
	var main = $('main');
	$(document).ready(function(){
		$('.main-section').parallax({
			imageSrc: './resources/image/parallax-gallery.png',
			naturalWidth: 3840,
			naturalHeight: 2769,
			speed: 0.1
		});
		clearList.push('.main-section');

		$('#math').parallax({
			imageSrc: './resources/image/parallax-math.png',
			naturalWidth: 1440,
			naturalHeight: 760,
			speed: 0.1
		});
		clearList.push('.parallax-section');

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
