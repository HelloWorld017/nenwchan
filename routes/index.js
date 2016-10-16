const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('frame', {
		name: 'index'
	});
});

router.get('/pjax', (req, res, next) => {
	res.render('index', {}, (err, html) => {

	});
});

router.get('/gallery', (req, res, next) => {
	res.render('frame', {
		name: 'gallery'
	});
});

router.get('/gallery/pjax', (req, res, next) => {
	res.render('gallery', {}, (err, html) => {

	});
});

router.get('/service', (req, res, next) => {
	res.render('frame', {
		name: 'service'
	});
});

router.get('/service/pjax', (req, res, next) => {
	res.render('service', {}, (err, html) => {

	});
});

module.exports = router;
