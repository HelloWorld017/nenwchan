(function(){
	var clearList = [];
	var main = $('main');
	var aside = $('aside');
	var asideOpened = false;
	var background = $('.menu-background');
	var toggle = function(e){
		if(!asideOpened){
			aside.css({
				left: '0'
			});

			background.css({
				'z-index': '3',
				'background-color': 'rgba(0, 0, 0, 0.7)'
			});
		}else{
			aside.css({
				left: '-300px'
			});

			background.css({
				'z-index': '-10',
				'background-color': 'rgba(0, 0, 0, 0)'
			});
		}
		asideOpened = !asideOpened;
	};

	$(document).ready(function(){
		$('.main-section').parallax({
			imageSrc: './resources/image/parallax-gallery.png',
			speed: 0.1
		});
		clearList.push('.main-section');

		['math', 'korean', 'art', 'progress'].forEach(function(v){
			$('#' + v).parallax({
				imageSrc: './resources/image/parallax-' + v +'.png',
				naturalWidth: 1440,
				naturalHeight: 760,
				speed: 0.1
			});
			clearList.push('#' + v);
		});

		main.on('scroll', function(){
			$(window).trigger('resize').trigger('scroll');
		});

		$('.menu-viewer').click(toggle);
		background.click(toggle);

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
