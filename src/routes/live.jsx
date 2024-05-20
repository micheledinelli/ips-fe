import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Live() {
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Building",
          type: "perimeter",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [0, 0],
              [0, 150],
              [100, 100],
              [100, 0],
              [0, 0],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Kitchen",
          roomId: 1,
          users: [2727],
          type: "room",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [10, 10],
              [30, 10],
              [30, 30],
              [10, 30],
              [10, 10],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Living Room",
          roomId: 2,
          users: [2727, 3030],
          type: "room",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [40, 10],
              [60, 10],
              [60, 30],
              [40, 30],
              [40, 10],
            ],
          ],
        },
      },
    ],
  };

  const [geoData, setGeoData] = useState();

  useEffect(() => {
    var source = new EventSource("http://localhost:8888/live");
    source.onmessage = function (event) {
      setGeoData(JSON.parse(event.data));
    };

    return () => {
      source.close();
    };
  }, []);

  const style = (feature) => {
    if (feature.properties.type === "perimeter") {
      return {
        fillColor: "black",
        color: "black",
        weight: 2,
        fillOpacity: 0.5,
      };
    } else {
      return {
        fillColor: "green",
        color: "green",
        weight: 2,
        fillOpacity: 0.5,
      };
    }
  };

  const MapComponent = () => {
    const onEachFeature = (feature, layer) => {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(
          `<strong>${feature.properties.name}</strong><br />${
            feature.properties.users
              ? `Users: ${feature.properties.users.join(", ")}`
              : "No users"
          }`
        );
      }
    };

    if (!geoData) {
      return <>LOADING</>;
    }

    return (
      <MapContainer
        className="w-full h-full"
        center={[50, 50]}
        zoom={2}
        style={{ backgroundColor: "inherit" }}
        crs={L.CRS.Simple}
        zoomControl={false}
      >
        {/* <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}
        <GeoJSON data={geoData} onEachFeature={onEachFeature} style={style} />
      </MapContainer>
    );
  };

  return (
    <div className="w-full h-screen text-white bg-cover bg-hero-pattern-1 overflow-hidden">
      <div className="fixed top-3 p-5 w-full flex justify-between items-center text-xl md:text-2xl z-20">
        <div className="text-2xl">
          <button className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
            <Link to={"/"}>HOME</Link>
          </button>
        </div>
      </div>
      <div className="flex h-screen w-full justify-center items-center z-10">
        <MapComponent />
      </div>
    </div>
  );
}