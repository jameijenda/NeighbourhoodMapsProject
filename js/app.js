var map;

var places = [
      {
        coords:{lat: -34.9056020, lng: -56.1825029},       
      },
      {
        coords:{lat: -34.9031735, lng: -56.1808506},
      },
      {
        coords:{lat: -34.9048805, lng: -56.1896483},    
      }
    ];

function ViewModel() {

    var self = this;

    this.markers = [];
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.905603, lng: -56.186499},
        zoom: 16
    });
   
   
    this.InfoWindow = new google.maps.InfoWindow();

    places.forEach(function(place){
      this.markerCoords = place.coords;

      this.marker = new google.maps.Marker({
        map: map,
        position: place.coords,
        animation: google.maps.Animation.DROP
      });
      this.marker.addListener('click', self.markerAnimation);
      self.markers.push(this.marker); 
      
      
    });

    this.markerAnimation = function() {
      this.setAnimation(google.maps.Animation.BOUNCE);
    };
        
         
          
    /*var infowindow = new google.maps.InfoWindow({
        content: "Do you ever feel like a plastic bag"
    });
    
    marker.addListener('click', function(){
        infowindow.open(map, marker);
    });*/
};


function render() {
    ko.applyBindings(new ViewModel());
}
