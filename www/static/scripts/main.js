let serverAdr = 'http://localhost:8080';

// get the data
let examplesAjax = $.ajax({
  method: 'GET',
  url: serverAdr + '/api/Examples/EXAMPLES?metadata=true'
}).fail(err => {
  console.log(err);
})

let publicProjectsAjax = $.ajax({
  method: 'GET',
  url: serverAdr +'/api/Projects/PROJECTS'
}).fail(err => {
  console.log(err);
})
// end of calls to get the data

$(document).ready(function() {

  var $grid = $('#examples-grid');
  var $pSlider = $('#projects-slider');
  examplesAjax.success(examples=>{
    console.log('ajax is done');
    console.log(examples);
    for (var i = 0; i < examples.length; i++) {
      // let exampleEl = json2Proj(examples[i], 'col-md-2');
      let exampleEl = json2Card(examples[i]);

      $grid.append(exampleEl);
    }


    // init Isotope
    $grid.isotope({
      // options
      filter: '.featured'
    });
    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $grid.isotope({ filter: filterValue });
    });
  $('.prj-element a').popover();


  })

  publicProjectsAjax.success(data=>{
    console.log('number of projects',data.length);
    if(data.length > 8){
        console.log('public projects',data);
        for(let i = 0; i < data.length; i++){
          let projectEl =  '<li>' + json2Proj(data[i]) + '</li>';
          $pSlider.append(projectEl);
        }

      //lightslider
        $pSlider.lightSlider({
            autoWidth:true,
            loop:true,
            auto:true,
            pauseOnHover: true,
            onSliderLoad: function() {
              $pSlider.removeClass('cS-hidden');
              $('h3.hidden').removeClass('hidden');
            } 
        });
        $('.prj-element a').popover();
    }

  })


}); // end of document ready func