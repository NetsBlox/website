/* Copyright G. Hemingway, @2017 */
'use strict';

const path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    axios				= require('axios'),
    logger          = require('morgan');

let port = process.env.PORT ? process.env.PORT : 8000;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
// Setup pipeline logging
if (env !== 'test') app.use(logger('dev'));
// Setup pipeline support for static pages
app.use(express.static(path.join(__dirname, '../../public')));
// Setup pipeline support for server-side templates
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
// Finish pipeline setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Import our API Routes
// require('./api/v1/game')(app);

/**********************************************************************************************************/



// Give them the SPA base page
app.get('*', (req, res) => {
    // get the exmaples and public projects data
    // let serverAdr = 'https://editor.netsblox.org';
    let serverAdr = 'http://localhost:8080';

    // get examples data
    let examplesPromise = axios({
      	url: serverAdr + '/api/Examples/EXAMPLES?metadata=true',
      	method: 'get',
    });

    // get projects data
    let publicProjectsPromise = axios({
      method: 'GET',
      url: serverAdr +'/api/Projects/PROJECTS'
    });

    // end of calls to get the data

	axios.all([examplesPromise,publicProjectsPromise]).then(axios.spread((examples,projects)=>{
		console.log('data resid',projects.data.length)
    // TODO cache results and serve from cache
		res.render('index.pug', {name: 'ali', examples: examples.data, projects: projects.data});
	})).catch((err)=>{
    //handle errors
		console.log('rid',err)
	})

    });


/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});