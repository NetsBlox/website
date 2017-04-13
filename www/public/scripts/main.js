// let serverAdr = 'https://editor.netsblox.org';
let serverAdr = 'http://local.netsblox.org:8080';

// // get examples data
// let examplesAjax = $.ajax({
//   method: 'GET',
//   url: serverAdr + '/api/Examples/EXAMPLES?metadata=true'
// }).fail(err => {
//   console.log(err);
// })

// let publicProjectsAjax = $.ajax({
//   method: 'GET',
//   url: serverAdr +'/api/Projects/PROJECTS'
// }).fail(err => {
//   console.log(err);
// })
// end of calls to get the data

$(document).ready(function() {

  var $grid = $('#examples-grid');
  let $gridM = $('#examples-grid-m');
  var $pSlider = $('#projects-slider');
  // examplesAjax.success(examples=>{
  //   console.log('examples are loaded',examples);
  //   services = []
  //   examples.map(ex => {
  //     services = services.concat(ex.services);
  //   });
  //   // console.log(examples);
  //   for (var i = 0; i < examples.length; i++) {
  //     // let exampleEl = json2Proj(examples[i], 'col-md-2');
  //     let exampleEl = json2Card(examples[i]);
  //     let exampleMobileEl = json2MobileEl(examples[i]);

  //     $grid.append(exampleEl);
  //     $gridM.append(exampleMobileEl);
  //   }


    // init Isotope
    $grid.isotope({
      // options
      // layoutMode: 'fitRows',
      itemSlecetor: '.element-item',
      filter: '.featured'
    });
    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $grid.isotope({ filter: filterValue });
    });

  // $('.prj-element a').popover();


  // })

  // publicProjectsAjax.success(data=>{
  //   console.log('number of projects',data.length);
  //   if(data.length > 3){
  //       console.log('public projects',data);
  //       for(let i = 0; i < data.length; i++){
  //         let projectEl =  '<li>' + json2Proj(data[i]) + '</li>';
  //         $pSlider.append(projectEl);
  //       }

      //lightslider
        $pSlider.lightSlider({
            autoWidth:false,
            item: 5,
            pager: false,
            loop:true,
            auto:true,
            pauseOnHover: true,
            onSliderLoad: function() {
              $pSlider.removeClass('cS-hidden');
            } 
        });
        // $('.prj-element a').popover();
  //   }

  // })


  // close modal when clicking on backdrop
  // $("body").on("click", ".modal-dialog", function(e) {
  //      if ($(e.target).hasClass('modal-dialog')) {
  //          var hidePopup = $(e.target.parentElement).attr('id');
  //          $('#' + hidePopup).modal('hide');
  //      }
  //  });


}); // end of document ready func

let grabUserProjects;


$('form').submit(function(e){
  e.preventDefault();
  let username = $('input[name="username"]').val();
  let password = $('input[name="password"]').val();
  let hashedP = SHA512(password);
  console.log(username,hashedP);

  $.ajax({
    url: serverAdr + '/api/?SESSIONGLUE=.sc1m16',
    method: 'POST',
    data: {
      __h: hashedP,
      __u: username,
      remember: true
    },
    statusCode: {
        403: function (xhr) {
          // login failed ( catching using status code due to the response)
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
    },
    success: data =>{
      console.log('logged in');
      grabUserProjects = $.ajax({
          url: serverAdr + '/api//getProjectList?format=json',
          method: 'GET',
          xhrFields: {
             withCredentials: true
          },
          crossDomain: true,
          success: data => {
            console.log('grabbed user projects', data);
          },
          fail: err => {
            console.log('failed to get user data');
          }
        })
    },
    fail: err =>{
      console.log(err);
    }

  })
}) // end of on submit
