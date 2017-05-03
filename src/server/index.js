'use strict';
const path 			= require('path'),
	express 		= require('express'),
	bodyParser 		= require('body-parser'),
	axios			= require('axios'),
	http 			= require('http'),
	https 			= require('https'),
	cookieParser 	= require('cookie-parser'),
	logger			= require('morgan'),
	fs 				= require('fs');

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const SERVER_ADDRESS = process.env.EDITOR_ADDRESS;
// setup https - doesn't setup a secure server if the port is not defined. 
const SECURE_PORT = process.env.SECURE_PORT;
const CERT_DIR = process.env.CERT_DIR || __dirname; // expects key.pem & cert.pem
/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
// parse cookies
app.use(cookieParser());
// Setup pipeline logging
if (NODE_ENV !== 'test') app.use(logger('dev'));
// Setup pipeline support for static pages
app.use(express.static(path.join(__dirname, '../../public')));
// Setup pipeline support for server-side templates
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = true;
app.locals.env = process.env; 

// redirect to https if available
if (SECURE_PORT) {
	app.use (function (req, res, next) {
		if (req.secure) {
			next();
		} else {
			res.redirect('https://' + req.hostname +':'+SECURE_PORT+ req.url);
		}
	});
}
// Finish pipeline setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**********************************************************************************************************/

app.get('/', (req, res) => {
		// get the exmaples and public projects data
		// get examples data
		let examplesPromise = axios({
				url: SERVER_ADDRESS + '/api/Examples/EXAMPLES?metadata=true',
				method: 'get',
		});

		// get projects data
		let publicProjectsPromise = axios({
			method: 'GET',
			url: SERVER_ADDRESS +'/api/Projects/PROJECTS'
		});
		// end of calls to get the data

		axios.all([examplesPromise,publicProjectsPromise]).then(axios.spread((examples,projects)=>{
				console.log('Data received from server',projects.data.length)
		// TODO cache results and serve from cache
				res.render('index.pug', {examples: examples.data, projects: projects.data });
		})).catch((err)=>{
		//handle errors
				console.log('Failed to get projects data from netsblox server.',err);
				res.status(500).send();
		});

});

app.get('/tutorials*', (req,res) => {
	res.render('tutorials.pug',{});
});

app.get('*', (req,res)=>{
	res.status(404).send('Page not found. Go back to <a href="/">Home Page</a>. If you believe there is a mistake, please let us know at <a href="https://facebook.com/netsblox"> our facebook page</a>.');
});

/**********************************************************************************************************/

// Run the server itself


let httpServer = http.Server(app).listen(PORT, () => {
	console.log('listening on unsecure port: ' + PORT);
});

if (SECURE_PORT) {
	const SSL_OPTIONS = {
		key: fs.readFileSync(CERT_DIR + '/key.pem'),
		cert: fs.readFileSync(CERT_DIR + '/cert.pem')
	};
	let httpsServer = https.createServer(SSL_OPTIONS, app);
	httpsServer.listen(SECURE_PORT);
	console.log('listening on secure port: ',SECURE_PORT);

}