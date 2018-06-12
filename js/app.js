var map;

var places = [
      {
        title: 'Automovil Club del Uruguay',
        coords:{lat: -34.904759, lng: -56.189162
        },       
      },
      {
        title: 'Grupocine Torre de los Profesionales',
        coords:{lat: -34.90273716428635, lng: -56.1880319023078
        },
      },
      {
        title: 'El Gaucho',
        coords:{lat: -34.90524373610124, lng: -56.18509797993519},    
        },
      {
        title: 'Subway',
        coords:{lat: -34.90608759593457, lng: -56.19157126828292},    
        }
    ];

function ViewModel() {

    var self = this;


    this.markers = [];
    this.filteredResults = [];

    
    this.createMapAndMarkers = function() { 

      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.905603, lng: -56.186499},
          zoom: 16
      });

      this.InfoWindow = new google.maps.InfoWindow({
        content: "Placeholder"
      });


      

      places.forEach(function(place){

        this.marker = new google.maps.Marker({
          map: map,
          position: {
            lat: place.coords.lat,
            lng: place.coords.lng
          },
          title: place.title,
          animation: google.maps.Animation.DROP
        });



        self.markers.push(this.marker); 

        this.marker.addListener('click', self.animationAndInfo);

      });

    };

          
      

    this.animationAndInfo = function() {
      self.getAPIDataAndPopulate(this);
      this.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout((function() {
          this.setAnimation(null);
      }).bind(this), 1200);

      setTimeout((function() {
          self.InfoWindow.setContent(self.infoWindowContent);      
          self.InfoWindow.open(map, this);;
        }).bind(this), 500);
    };      

      




    this.getAPIDataAndPopulate = function(data) {


          var lat = data.getPosition().lat();
          var lng = data.getPosition().lng();
          var title = data.title;

          // Foursquare API call

      fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=SVZ5OCK2BVJSNEOMS3PRUVZGIBD52HTF0YO4WJSNHNXYMHZ1&client_secret=GNW4DFY2KRSIVOKQHRI221XBF3QNF2RMRFDZROKOYRSDZ4AI&query=${title}&v=20180323`)
      
      .then(function(response){
        var json = response.json();
        return json;
      })
      
      .then(function test(myJson){
        self.businessName = myJson.response.venues[0].name;
        self.street = myJson.response.venues[0].location.address;
        self.category = myJson.response.venues[0].categories[0].name;

        /* This console.log is a test to see if the right values come through */

        console.log(self.businessName, self.street, self.category);

        self.infoWindowContent = `<h2 class="businessName"> ${self.businessName}</h2>                   
                                  <h3 class="category"> ${self.category}</h3>
                                  <p4 class="address"> ${self.street}</p4>`;
        })

        .catch(function(){
          alert(`
                Oops! The Foursquare API could not be loaded.
                Please reload your page and hope for the best`)
        });


    };

    this.createMapAndMarkers();

    
    
    
    
    

    this.searchInput = ko.observable('');

    this.mySearch = ko.computed(function() {
      
      self.markers.forEach(function(index){
        var markerTitle = index;
        if (markerTitle.title.toLowerCase().includes(self.searchInput().toLowerCase())) {
          self.filteredResults.push(markerTitle);
          index.setVisible(true);
        } else {
          index.setVisible(false);
        }
      })
      return self.filteredResults;
    }, this);

};

  
                       


function render() {
    ko.applyBindings(new ViewModel());
}