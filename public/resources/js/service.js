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
