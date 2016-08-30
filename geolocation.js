function addEvent(event, elem, fxn) {
   if (elem.addEventListener) {
      elem.addEventListener(event, fxn, false);
    }
}

function toggleMap(){
  var isMapUp = document.getElementById("maplocation");
  if(typeof map === 'undefined') {
    determineLocation();
  }

   if (isMapUp.style.display =="block"){
     localStorage.setItem("mapStatus", "closed");
    isMapUp.style.display="none";
  } else {
    localStorage.setItem("mapStatus", "open");
    isMapUp.style.display="block";
  }

}

function determineLocation() {
    if (navigator.onLine) {
      if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(displayOnMap);
      }
    }
    else {
      alert("You must be online to use this feature.");
    }
}

function displayOnMap(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Let's use Google Maps to display the location
    var myOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("maplocation"), myOptions);

    var initialLocation = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: "Hello World!"
    });

    map.setCenter(initialLocation);
}

var map; // this will be our holder of the map object once its created.
var geobutton = document.getElementById('mapbutton');
addEvent('click', geobutton, toggleMap);
