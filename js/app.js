let map;

const places = [
      {
        title: `McDonald's`,
        coords:{lat: -34.9054529, lng: -56.18679
        },       
      },
      {
        title: 'Grupocine Torre de los Profesionales',
        coords:{lat: -34.9046349, lng: -56.188449
        },
      },
      {
        title: 'El Gaucho',
        coords:{lat: -34.905423, lng: -56.185117},   
        },
      {
        title: 'Subway',
        coords:{lat: -34.906261, lng: -56.1919268},    
        },
      {
        title: 'Ruffino',
        coords:{lat: -34.9069357, lng: -56.1908627},     
        },
      {
        title: 'Il Mondo della Pizza',
        coords:{lat: -34.9063418, lng: -56.1964289},    
        },  
      {
        title: 'El Fogon',
        coords:{lat: -34.9071491, lng: -56.1929876},     
        },
      {
        title: 'El Lobizon',
        coords:{lat: -34.9073619, lng: -56.1899601},    
        }, 
      {
        title: 'Bar Bremen',
        coords:{lat: -34.9095246, lng: -56.1874328},    
        }, 
      {
        title: 'Maldonado Bar',
        coords:{lat: -34.908673, lng: -56.178496},    
        },
      {
        title: `Empanadas D'La Ribera `,
        coords:{lat: -34.903361, lng: -56.1808996},    
        },
      {
        title: 'Chesterhouse',
        coords:{lat: -34.9051213, lng: -56.2001099},    
        }
    ];

  

function ViewModel() {

    const self = this;


    this.markers = [];

    /* This function displays the map, creates the marker and the InfoWindow which content will be filled out later */

    this.createMapAndMarkers = function() { 

      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.9057345, lng: -56.1913148},
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

          
    /* This function sets both the marker's animation and the infoWindow's content.*/

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

      

    /* This function retrieves the info. from Foursquare's API and then formats the infoWindow's text. */


    this.getAPIDataAndPopulate = function(data) {


          const lat = data.getPosition().lat();
          const lng = data.getPosition().lng();
          const title = data.title;

          // Foursquare API call

      fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=SVZ5OCK2BVJSNEOMS3PRUVZGIBD52HTF0YO4WJSNHNXYMHZ1&client_secret=GNW4DFY2KRSIVOKQHRI221XBF3QNF2RMRFDZROKOYRSDZ4AI&query=${title}&v=20180323`)
      
      .then(function(response){
        const json = response.json();
        return json;
      })
      
      .then(function test(myJson){
        self.businessName = myJson.response.venues[0].name;
        self.street = myJson.response.venues[0].location.address;
        self.category = myJson.response.venues[0].categories[0].name;

        self.infoWindowContent = `<h2 class="businessName"> ${self.businessName}</h2>                   
                                  <h3 class="category"> ${self.category}</h3>
                                  <h4>Adress:</h4>
                                  <p class="address"> ${self.street}</p>`;
        })

        .catch(function(){
          alert(`
                Oops! The Foursquare API could not be loaded.
                Please reload your page and hope for the best`)
        });


    };

    this.createMapAndMarkers();

    
    
    /* This function uses the power of KO Js to filter the list after performing a search */
    
    self.filteredResults = "";

    this.searchInput = ko.observable("");

    this.mySearch = ko.computed(function() {
      self.filteredResults = [];
      self.markers.forEach(function(index){
        let markerTitle = index;
        if (markerTitle.title.toLowerCase().includes(self.searchInput().toLowerCase())) {
          self.filteredResults.push(markerTitle);
          index.setVisible(true);
        } else {
          index.setVisible(false);
        }
      })
      return self.filteredResults;
    });

};

                 


function render() {
    ko.applyBindings(new ViewModel());
}