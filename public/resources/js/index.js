(function(){
	var main = $('main');
	$(document).ready(function(){
		$('.main-section').parallax({
			imageSrc: './resources/image/parallax.jpg',
			naturalWidth: 3840,
			naturalHeight: 2400,
			speed: 0.1
		});

		$('.parallax-section').parallax({
			imageSrc: './resources/image/parallax2.png',
			naturalWidth: 4266,
			naturalHeight: 2049,
			speed: 0.1
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

		$('.section-scroll').click(function(e){
			main.animate({
				scrollTop: window.innerHeight
			}, 300);

			return false;
		});
	});
})();
