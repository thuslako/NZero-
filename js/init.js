//page load 
$('.tag').click(function(e){
	$('.active').addClass('active').fadeOut();
    var relId = $(this).attr('data-relId');
    $('#' + relId).addClass('active').fadeIn();
	$('nav').toggle(function(){
		$('nav').css("width", "20%");
		$('nav').css("-webkit-transition" ,"width .3s ease-in");
	});
});
// selected indicator 

$('.glyphicon').click(function(e){
    $('.glyphicon.blue-active').removeClass('selected');
    $(this).addClass('selected');
});


//hidden-menu
$('.nav-trig').click(function(){
	$('nav').toggle(function(){
		$('nav').css("width", "20%");
		$('nav').css("-webkit-transition" ,"width .3s ease-in");
	});
});

	
//map 
var map = L.mapbox.map('map','thuslako.i6m5docf');

var facts = 
	[
		"Canada does not have nuclear, chemical, or biological weapons or relevant delivery systems, and is a member in good standing of all of the relevant nonproliferation treaties and regimes. A significant producer and exporter of dual-use goods, particularly relating to civil nuclear applications, Canada also plays an active role in nonproliferation export control regimes.",
		"Cuba is not known to have nuclear, chemical, or biological weapons programs, and is a participant in many of the major nonproliferation treaties and regimes.",
		"No weapons of mass destruction or related delivery systems were located on the territory of Azerbaijan when it regained its independence after the collapse of the Soviet Union in 1991.[1] While Azerbaijan has been building stronger military capabilities due to a long-standing conflict with neighboring Armenia over the disputed Nagorno-Karabakh enclave, it has not sought to develop WMD capabilities."
	];

var countries = {

	'USA': {  'title':'America',
   	 		  'stockpile':'7506 warheads',
   	          'spending':'$61.3 billion (US)',
   	          'treaty': 'glyphicon glyphicon-ok green'
    },

	'RUS': {  'title':'Russia',
   	 		  'stockpile':'8484 warheads',
   	 		  'spending':'$14.8 billion (US)',
   	 		  'treaty': 'glyphicon glyphicon-ok green '
    },

	'FRA': {  'title':'France',
   		     'stockpile':'300 warheads',
   	         'spending':'$6.0 billion (US) ',
   	         'treaty': 'glyphicon glyphicon-ok green'
    },

	'GBR': {  'title':'United Kingdom',
		   	  'stockpile':'225 warheads',
		   	  'spending':'$5.5 billion (US)',
		   	  'treaty': 'glyphicon glyphicon-ok green'
    },

	'CHN': {  'title':'China',
   	 'stockpile':'250 warheads',
   	 'spending':'$7.6 billion (US)',
   	 'treaty': 'glyphicon glyphicon-ok green'
    },

	'PAK': {  'title':'Pakistan',
   	 'stockpile':'90-110 warheads',
   	 'spending':'$2.2 billion (US)',
   	 'treaty': 'glyphicon glyphicon-remove red'
    },

	'ISR': {  'title':'Israel',
   	 'stockpile':'80-200 warheads',
   	 'spending':'$1.9 billion (US)',
   	 'treaty': 'glyphicon glyphicon-remove red'
    },

	'IND': {  'title':'India',
   	 'stockpile':'80-100 warheads',
   	 'spending':'$4.9 billion (US)',
   	 'treaty': 'glyphicon glyphicon-remove red'
    },

	'PRK': {  'title':'North Korea',
   	 'stockpile':'<10 warheads',
   	 'spending':'$0.7 billion (US)',
   	 'treaty': 'glyphicon glyphicon-remove red'
    }




};

// adding mapped out map layer from json file 
var countryLayer = L.geoJson(CountryData,  {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);

// default style for drawn map
function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: '#fff',
          fillOpacity: 0.1,
          fillColor: getColor
      };
}
// define colour to for default map - you filter based on 
function getColor() {
      return '#357EC7';
}
// function used to return mouse interaction with map
function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

  var closeTooltip;

// mouse on hover 
  function mousemove(e) {

  	console.log(e.target);
      var layer = e.target;
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillColor: '#357EC7',
          fillOpacity: 0.3
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }
// mouse out 
  function mouseout(e) {
      countryLayer.resetStyle(e.target);
  }
// onclick zoom to clicked region 
  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }
// returning data based on region selected 
var country = document.getElementById('country');

map.gridLayer.on('mouseover',function(target){
		if((typeof target.data === 'object') && countries[target.data.ADM0_A3]){
			  $("#map_overlay").html("<h2>"+ countries[target.data.ADM0_A3].title +"</h2>\
			  	<hr class='feature-divider'>\
			  	<h4> Warhead count: <span class='label label-danger'>"+ countries[target.data.ADM0_A3].stockpile +"</span><h4>\
			  	<h4 class=''> Yearly spending <span class='label label-primary'>"+ countries[target.data.ADM0_A3].spending +"</span></h4>\
			  	<h4> Non-Proliferation Treaty member <span class='"+countries[target.data.ADM0_A3].treaty+"'></span></h4>");
			  $('#map_overlay').fadeIn();
		}
		else{
			$('#map_overlay').fadeOut("fast");
			document.getElementById('map_overlay').innerHTML = '';
		}

});



$(document).ready(function(){
	$('#map_overlay').fadeIn("slow")
	$("#map_overlay").html("<h2>Welcome</h2>\
				<hr class='feature-divider'>\
				<p> Starting hovering </p>\
	");
})

