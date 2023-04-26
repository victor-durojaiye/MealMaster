import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);


function RestaurantsNearby() {
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
    const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
     setUserLocation({ latitude: latitude, longitude: longitude});
    })
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation
      const apiKey = 'AIzaSyAyBZWtjLXHlpYghLrv_hlr2kUsZ1GoKps'
      const url ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=500&type=restaurant&key=' + apiKey
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setRestaurants(data.results);
        })
        .catch(error => console.error('Error fetching restaurants:', error));
    }
  }, [userLocation]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yZHVyb2phaXllIiwiYSI6ImNsZ3g0eHZvdjA0M2UzbG9ob2xiZmh1MnQifQ.3ZfvczPWcoL06od2nY5Rng';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [userLocation.longitude, userLocation.latitude],
    zoom: 13,
    pitch: 60,
    bearing: -60
    });

    map.on('load', function() {
      map.addSource('mapbox-terrain', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb'
      });
    
      map.addLayer({
        id: 'terrain',
        type: 'hillshade',
        source: 'mapbox-terrain',
        hillshadeExaggeration: 1
      }, 'waterway-label');
    });



      // Add a marker for each restaurant
      restaurants.forEach(restaurant => {
        new mapboxgl.Marker()
          .setLngLat(restaurant.geometry.location)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${restaurant.name}</h3><p>${restaurant.vicinity}</p> `))
          .addTo(map);
      });

    }, [userLocation, restaurants]);


  return (

   <div>
    <div class="flex flex-row">
    <div class="rounded-lg absolute bottom-11 right-11 drop-shadow-2xl" id="map" style={{ width: '500px', height: '200px' }} />
      {restaurants.map(restaurant => (
        <div key={restaurant.place_id}>
        </div>
      ))}
    </div>   
    </div>   


     );
}

export default RestaurantsNearby;
