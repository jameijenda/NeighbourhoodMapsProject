var map;

var markers = [
      {
        coords:{lat: -34.9056020, lng: -56.1825029},
        content:'marker1'
      },
      {
        coords:{lat: -34.9031735, lng: -56.1808506},
        content:'marker2'
      },
      {
        coords:{lat: -34.9048805, lng: -56.1896483},
        content:'marker3'      
      }
    ];

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.905603, lng: -56.186499},
        zoom: 16
    });
   
    
    

    markers.forEach(function(marker){
          new google.maps.Marker({
          position:marker.coords,
          map : map,
      });
    });
    
    /*var infowindow = new google.maps.InfoWindow({
        content: "Do you ever feel, like a plastic bag"
    });
    
    marker.addListener('click', function(){
        infowindow.open(map, marker);
    });*/
};

