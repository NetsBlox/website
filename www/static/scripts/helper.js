
//create an html element based on a project obj
function json2Proj(project, classes=''){
  project.category = ['max','even','featured'][Math.floor(Math.random() * 3)];
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
  project.category = ['max','even','featured'][Math.floor(Math.random() * 3)] + ' ' + ['max','even','featured'][Math.floor(Math.random() * 4)];
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