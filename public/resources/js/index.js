(function(){
	var clearList = [];
	var main = $('main');
	$(document).ready(function(){
		$('.main-section').parallax({
			imageSrc: './resources/image/parallax.jpg',
			naturalWidth: 3840,
			naturalHeight: 2400,
			speed: 0.1
		});
		clearList.push('.main-section');

		$('.parallax-section').parallax({
			imageSrc: './resources/image/parallax2.png',
			naturalWidth: 4266,
			naturalHeight: 2049,
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

		$('.section-scroll').click(function(e){
			main.animate({
				scrollTop: window.innerHeight
			}, 300);

			return false;
		});
	});

	$(document).on('turbolinks:before-cache', function(){
		clearList.forEach((v) => {
			$(v).parallax('destroy');
		});

		$(document).off('turbolinks:before-visit');
		$('.section-scroll').off('click');
		$('a[data-href]').off('click');
		$('main').off('scroll');
	});
})();
