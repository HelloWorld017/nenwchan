const path = require('path');
const router = require('express').Router();

router.get('/', (req, res, next) => {
	/*if(req.header('X-PJAX')){
		return res.render('index');
	}*/

	setTimeout(() => {
		res.render('frame', {
			name: 'index'
		});
	}, 5000);
});

router.get('/gallery', (req, res, next) => {
	/*if(req.header('X-PJAX')){
		return res.render('gallery');
	}*/
	setTimeout(() => {
		res.render('frame', {
			name: 'gallery'
		});
	}, 5000);
});

router.get('/service', (req, res, next) => {
	/*if(req.header('X-PJAX')){
		return res.render('service');
	}*/

	res.render('frame', {
		name: 'service'
	});
});

router.get('/loading', (req, res, next) => {
	res
		.status(200)
		.type('image/svg+xml')
		.header('Cache-Control', 'no-cache')
		.sendFile(path.resolve('./public/resources/image/load-animation.svg'));
});

module.exports = router;
