// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.

function initMap(lat,lng) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 39.42884719871828, lng: -9.224333070787692},
    mapTypeId: 'satellite'
  });

  var flightPlanCoordinates = [
    {lat: 39.42890, lng: -9.223902},
    {lat: 39.428763, lng: -9.224000},
    {lat: 39.428662, lng:-9.223625 },
    {lat: 39.428890, lng: -9.223549 },
    {lat: 39.42890, lng: -9.223902}

  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}


