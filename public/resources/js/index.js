var main = $('main');

$('.main-section').parallax({
	imageSrc: './resources/image/parallax.jpg'
});

$('.section-scroll').click(function(e){
	main.animate({
		scrollTop: window.innerHeight
	}, 300);

	return false;
});
