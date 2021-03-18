import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {offers, activeCard, city, mapType} = props;

  const MapSettings = {
    NEAR: {
      containerClass: `property__map`,
    },
    MAIN: {
      containerClass: `cities__map`,
    }
  };

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
    const points = new leaflet.LayerGroup();

    offers.forEach((offer) => {
      leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      },
      {
        icon,
        alt: offer.id
      }).addTo(points);
    });

    points.addTo(mapRef.current);

    return () => {
      mapRef.current.removeLayer(points);
    };

  }, [city]);

  useEffect(() => {
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        layer.setIcon(layer.options.alt === activeCard ? activeIcon : icon);
      }
    });
  }, [activeCard]);

  return (
    <section className={`${MapSettings[mapType].containerClass} map`}>
      <div id="map" ref={mapRef} style={{height: 100 + `%`}}></div>
    </section>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  activeCard: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  mapType: PropTypes.string.isRequired
};

export default Map;
