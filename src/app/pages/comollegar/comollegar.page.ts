import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/interfaces/marker';
import { Capacitor, Plugins, GeolocationPosition } from '@capacitor/core';
import { Pointers } from 'src/app/interfaces/pointers';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

const { Totast, Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-comollegar',
  templateUrl: './comollegar.page.html',
  styleUrls: ['./comollegar.page.scss'],
})
export class ComollegarPage implements OnInit {
  public coordinatess : Observable<GeolocationPosition>;
  public defaultPos : { latitude: 42, longitude: 42};


  map : any;
  origin : any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  markers: Marker[] = [
    {
      position: {
        lat: -19.58125,
        lng: -65.75709,
      },
      title: 'Seguro Social Universitario Potosí'
    },
    {
      position: {
        lat: -19.5828603,
        lng: -65.7592346,
      },
      title: 'Seguro Estudiantil'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.getCurrentPosition();
  }
  private async getCurrentPosition(): Promise<any> {
    const isAvaliable : boolean = Capacitor.isPluginAvailable('Geolocation');
    let positions : any;
    if(!isAvaliable) {
      console.log('Error algo falla con el plugins');
      return of(new Error('Err, Plugin'));
    }
    const POSITION = await Geolocation
      .getCurrentPosition()
      .then(data => {
        this.origin={
          lat: data.coords.latitude,
          lng: data.coords.longitude
        };
        console.log(this.origin);
      })
      .catch(err => {console.error(err)});
    this.loadMap();
    return await this.origin;
  }
  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map'); 
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    const myLatLng = {lat: -19.5814655, lng: -65.7576857};
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16
    });
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarkers();
    });
    
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  calculateRoute(medio: string) {
    let destination = { lat : -19.58125, lng : -65.75709 };
    this.directionsService.route({
      origin: this.origin,
      destination: destination,
      travelMode: (medio=='WALKING')?google.maps.TravelMode.WALKING:(((medio=='BICYCLING')?google.maps.TravelMode.BICYCLING:((medio=='DRIVING')?google.maps.TravelMode.DRIVING:google.maps.TravelMode.TRANSIT)))
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

}