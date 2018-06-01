var map;

var places = [
      {
        title: 'marker2',
        coords:{lat: -34.9056020, lng: -56.1825029},       
      },
      {
        title: 'marker3',
        coords:{lat: -34.9031735, lng: -56.1808506},
      },
      {
        title: 'marker1',
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
   
   


    places.forEach(function(place){
      /*this.markerCoords = place.coords;*/

      this.marker = new google.maps.Marker({
        map: map,
        position: place.coords,
        animation: google.maps.Animation.DROP
      });

      var contentString = place.title;

      var lat = this.marker.position.lat;
      var lng = this.marker.position.lng;

      this.InfoWindow = new google.maps.InfoWindow({
          content: contentString
        });

      self.markers.push(this.marker); 

      
      this.marker.addListener('click', function(){
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1200);
        
        
        //I'm getting a param error while using the lat and lng variables defined above

      
        fetch('https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=SVZ5OCK2BVJSNEOMS3PRUVZGIBD52HTF0YO4WJSNHNXYMHZ1&client_secret=GNW4DFY2KRSIVOKQHRI221XBF3QNF2RMRFDZROKOYRSDZ4AI&v=20180323')
        .then(function(response){
          return response.json();
        });
     

        InfoWindow.setContent(contentString);
        InfoWindow.open(map, this);

      });              
    
    });


                          
};


function render() {
    ko.applyBindings(new ViewModel());
}
