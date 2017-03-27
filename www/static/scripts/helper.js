// static data, to be provided via an api later

// let exampleNamesUnparsed = 'AirQuality	AirQuality	Battleship	Battleship	Caesar Shift	Caesar Shift	ConnectN	ConnectN	Database	Database	Dice	Dice	Earthquakes	Earthquakes	GoogleTrends	GoogleTrends	MarcoPolo	MarcoPolo	Movies	Movies	NASA	NASA	Pong	Pong	Quizzer	Quizzer	Simple TicTacToe	Simple TicTacToe	SimpleHangman	SimpleHangman	Star Map	Star Map	Story	Story	TicTacToe	TicTacToe	Traffic	Traffic	Twenty Questions	Twenty Questions	Weather	Weather';
// let exampleNames = exampleNamesUnparsed.split('\t').filter((item,indx,arr)=>{return indx%2 == 0});

// // basic-routes room store user store. on the server to provide the endpoints // projects save and delete needs

// // gets a netsblox project file and returns a json of it's metadata
// function project2Metadata(projectData){
// 	$projectXML = $($.parseXML( projectData ));
//   	let thumbnail = $projectXML.find("thumbnail").text();
//   	let projectName = $projectXML.find("project")[0].attributes[1].nodeValue;
//   	let description = $projectXML.find("notes").text();
//   	// let rpcs = 's="getJSFromRPCStruct"><l>HERECOMESTHENAME'

//   	let metadata = {
//   		title: projectName,
//   		category: ['max','even','odd','featured'][Math.floor(Math.random() * 4)],
//   		description: description,
//   		thumbnail: thumbnail
//   	};
//   	console.log(metadata);
//   	return metadata;
// }

// // get the project data one by one as there is no endpoint to get it all at once
// //query the server for project's data
// let promises = [];
// for (var i = 0; i < exampleNames.length; i++) {
// 	let title = exampleNames[i];
//     promises.push(
//     		$.ajax({
//     		  url: `http://localhost:8080/api/Examples/${title}?socketId=_client_467&preview=true`,
//     		  method: 'GET'
//     		})
//     	);
// }
// // wait for all query data to come back. ( maybe change it so that each one proceeds asap?)
// let examples = [];
// // let examplesMetadataPromise = new Promise((resolve,reject)=>{
// // 	Promise.all(promises)
// // 		.then(
// // 			(args)=>{
// // 				console.log(args.length, 'Ajax calls returned');
// // 				// create the examples json by parsing the project data
// // 				for(let i =0; i < args.length; i++){
// // 					examples.push(project2Metadata(args[i]));
// // 				}
// // 				resolve(examples);
// // 			}
// // 		)
// // 		.catch(err=>{reject(err);})
// // });


//create an html element based on a project obj
function json2Proj(project, classes=''){
  project.category = ['max','even','odd','featured'][Math.floor(Math.random() * 4)];
  let popover = project.notes !== '' ? `data-toggle="popover" data-trigger="hover" data-placement="botto"m title="${project.roleNames[0]}" data-content="${project.notes}"` : ''
  return `<div class="prj-element element-item ${project.category} ${classes}">
                <a href="${serverAdr}/#present:Username=${project.owner}&ProjectName=${project.projectName}" target="_blank" ${popover}>
                <div class="thumbnail">
                  <img src="${project.thumbnail}" alt="NetsBlox Project: ${project.projectName}">
                  <div class="caption text-center">
                    <h4>${project.projectName}</h4>
                  </div>
                </div>
                </a>
              </div>`
}
//create html card based on project obj
function json2Card(project){
  project.category = ['max','even','odd','featured'][Math.floor(Math.random() * 4)];
  return `<div class="col-sm-3 col-md-2 element-item ${project.category}">
             <div class="card-container">
                <a href="https://editor.netsblox.org/#present:Username=${project.owner}&ProjectName=${project.projectName}" target="_blank">
                <div class="card">
                    <div class="front">
                        <div class="cover">
                            <img src="${project.thumbnail}"/>
                        </div>
                        <div class="user hidden">
                            <img class="img-circle" src="${project.thumbnail}"/>
                        </div>
                        <div class="content">
                            <div class="main">
                                <h3 class="name">${project.projectName}</h3>
                                <p class="profession">RPC 1</p>
                                <p class="text-center">"${project.notes ? project.notes.substring(0,30) : 'No description.'}"</p>
                            </div>
                        </div>
                    </div> <!-- end front panel -->
                    <div class="back">
                        <div class="content">
                            <div class="main">
                                <h4 class="text-center">${project.roleNames[0]}</h4>
                                <p class="text-center"><small>${project.notes || 'No description provided.'}</small></p>

                                <div class="stats-container">
                                    <div class="stats">
                                        <h4>235</h4>
                                        <p>
                                            Views
                                        </p>
                                    </div>
                                    <div class="stats">
                                        <h4>114</h4>
                                        <p>
                                            Likes
                                        </p>
                                    </div>
                                    <div class="stats">
                                        <h4>${project.roleNames.length}</h4>
                                        <p>
                                            Roles
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- end back panel -->
                </div> <!-- end card -->
                </a>
            </div> <!-- end card-container -->
            </div>`
}