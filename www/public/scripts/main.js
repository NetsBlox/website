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
    var qsRegex;
    $grid.isotope({
      // options
      // layoutMode: 'fitRows',
      itemSlecetor: '.element-item',
      filter: function() {
        return qsRegex ? $(this).text().match( qsRegex ) : true;
      }
    });
    // setup button filters for isotope
    // $('.filter-button-group').on( 'click', 'button', function() {
    //   var filterValue = $(this).attr('data-filter');
    //   $(this).addClass('active');
    //   $(this).siblings().removeClass('active');
    //   $grid.isotope({ filter: filterValue });
    // });

    //filter items on search
    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
      }
    }

    //==== end of isotope ====

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

  // determine if logged in
  let user = Cookies.get('username');
  if (user !== undefined) {
    updateLoginViews(true);
    alert('welcome ' + user);
  }


  //logout 
  $('#logout').on('click',()=>{
    Cookies.remove('username');
    Cookies.remove('netsblox-cookie');
    updateLoginViews(false);
  })


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
    data: JSON.stringify({
      __h: hashedP,
      __u: username,
      remember: true
    }),
    contentType: "application/json; charset=utf-8",
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true,
    statusCode: {
        403: function (xhr) {
          // login failed ( catching using status code due to the response)
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
    },
    success: data =>{
      console.log('logged in');
      postLogin(); // promises..
    },
    fail: err =>{
      console.log(err);
    }

  })


function postLogin(){
  Cookies.set('username',username,{expires: 14}); 
  grabUserProjects = $.ajax({
      url: serverAdr + '/api//getProjectList?format=json',
      method: 'GET',
      xhrFields: {
         withCredentials: true
      },
      crossDomain: true,
      success: data => {
        console.log('grabbed user projects', data);
      }
    })

  updateLoginViews(true);
}




}) // end of on submit


function updateLoginViews(isLoggedIn){
  //use toggle? 
  if (isLoggedIn) {
    $('#login').addClass('hidden');
    $('#logout').removeClass('hidden');
    $('nav p').removeClass('hidden').find('b').text(Cookies.get('username'));
    $('#login-modal').modal('hide');
  }else{ //means we are logging out
    $('#login').removeClass('hidden');
    $('#logout').addClass('hidden');
    $('nav p').addClass('hidden');
  }
}
