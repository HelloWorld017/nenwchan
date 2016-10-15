const app = require('./app');
const chalk = require('chalk');
const http = require('http');

const port = ((val) => {
	let portNumber = parseInt(val, 10);

	if(isNaN(portNumber)){
		return val;
	}

	if(portNumber >= 0){
		return portNumber;
	}

	return false;
})(process.env.PORT || '3000');

app.set('port', port);

const httpServer = http.createServer(app);

httpServer.listen(port);
httpServer.on('error', (err) => {
	if(err.syscall !== 'listen') throw err;
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	switch(err.code){
		case 'EACCES':
				console.error(chalk.bgRed('권한이 없습니다!'));
				process.exit(1);
				return;

		case 'EADDRINUSE':
			console.error(chalk.bgRed('포트가 이미 점령당했습니다!'));
			process.exit(1);
			return;

		default:
			throw error;
	}
});

httpServer.on('listening', () => {
	const addr = httpServer.address();
	console.log(chalk.cyan((typeof addr === 'string') ? `${addr}로 파이프 중...` : `${addr.port}번 포트에서 듣는 중...`));
});
