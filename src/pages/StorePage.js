import { IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as SagaActionTypes from '~/redux/constants';
import L from 'leaflet';
import CustomMarker from '~/components/Store/CustomMarker';
import BoyIcon from '@mui/icons-material/Boy';
import { Helmet } from 'react-helmet';
import NotFoundImg from '~/components/UI/NotFound';

const StorePage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { listStores } = useSelector((state) => state.storeSlice);
  const position = !loading
    ? [listStores[0].gps_coordinates.latitude, listStores[0].gps_coordinates.longitude]
    : [51.505, -0.09];

  useEffect(() => {
    state &&
      dispatch({
        type: SagaActionTypes.GET_LOCALSTORES_SAGA,
        storeName: state.storeName,
        callback: () => setLoading(false),
        fail: () => setError(true),
      });
  }, [dispatch, state]);

  var greenIcon = L.icon({
    iconUrl: require('../assets/marker_map.png'),
    iconSize: [25, 41], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-8, -80], // point from which the popup should open relative to the iconAnchor
  });

  function MyLocationButton() {
    const map = useMap();
    const getLocation = () => {
      map.locate();
    };
    return (
      <IconButton color="error" onClick={getLocation} sx={{ position: 'absolute', left: 2, top: 70, zIndex: 10000 }}>
        <BoyIcon fontSize="large" />
      </IconButton>
    );
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={greenIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Helmet>
        <title>{`${!state?.storeName ? '404' : `${state?.storeName}`} | Lapteller`}</title>
      </Helmet>
      {!state?.storeName ? (
        <NotFoundImg />
      ) : error ? (
        <NotFoundImg isWrong={true} />
      ) : loading ? (
        <Skeleton variant="rectangular" height={'100%'} width={'100%'} animation="wave" />
      ) : (
        <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listStores.map((item) => (
            <CustomMarker key={item.place_id} store={item} />
          ))}
          <LocationMarker />
          <MyLocationButton />
        </MapContainer>
      )}
    </div>
  );
};
export default StorePage;
