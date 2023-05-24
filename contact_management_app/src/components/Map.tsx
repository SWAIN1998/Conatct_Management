import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  const [selected, setSelected] = useState<any>({});
  const [currentPosition, setCurrentPosition] = useState<any>({});
  const locations: any = [];
  const [countriesData, setCountriesData] = useState<any>([]);

  useEffect(() => {
    // Fetch country specific data
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => setCountriesData(data));
  }, []);

  countriesData?.map((item: any) => {
    locations.push({
      location: { lat: item?.countryInfo?.lat, lng: item?.countryInfo?.long },
      label: item?.cases,
    });
  });
  const defaultCenter = {
    lat: locations[0]?.location?.lat,
    lng: locations[0]?.location?.lng,
  };

  const onSelect = (item: any) => {
    setSelected(item);
  };

  const mapStyles = () => {
    return {
      marginTop: "-20px",
      height: "70vh",
      width: "100%",
    };
  };
  let icon = `https://www.flaticon.com/free-icon/store_9902023?term=location&page=1&position=42&origin=tag&related_id=9902023`;
  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAkbTYVERg8jYRyDkirf_SzmllrHSKqPnc"
      >
        <GoogleMap
          id="google-map"
          mapContainerStyle={mapStyles()}
          zoom={8}
          clickableIcons={true}
          center={currentPosition?.lat ? currentPosition : defaultCenter}
        >
          {locations?.map((item: any) => (
            <Marker
              animation={"DROP" as any}
              key={item}
              position={item?.location}
              onClick={() => onSelect(item)}
              clickable={true}
              label={item?.label}
              title={item?.label}
              // options={options}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
