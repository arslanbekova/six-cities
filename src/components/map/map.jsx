import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';

import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {offers, activeCard, city} = props;

  const cityPoints = offers[0].city.location;
  const mapRef = useRef();

  const icon = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  const activeIcon = leaflet.icon({
    iconUrl: `img/pin-active.svg`,
    iconSize: [30, 30]
  });

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: cityPoints.latitude,
        lng: cityPoints.longitude
      },
      zoom: cityPoints.zoom,
      zoomControl: false,
      marker: true
    });

    mapRef.current.setView([cityPoints.latitude, cityPoints.longitude], cityPoints.zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };

  }, [city]);


  useEffect(() => {
    offers.forEach((offer) => {
      leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      },
      {
        icon: offer.id === activeCard ? activeIcon : icon
      })
      .addTo(mapRef.current);
    });
  }, [offers, activeCard]);

  return (
    <div id="map" ref={mapRef} style={{height: 100 + `%`}}></div>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  })),
  activeCard: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired
};

export default Map;
